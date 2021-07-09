import { IBitrixDealRepository } from '../../../Bitrix/repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../../Bitrix/schemas/BitrixDeal';
import { DealCategory } from '../../../deal/schemas/DealCategory';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { ListPartnerDealsCategoriesUseCase } from '../ListPartnerDealsCategories/ListPartnerDealsCategoriesUseCase';
import { GetPartnerDealsInformationSchema } from './GetPartnerDealsInformationSchema';

class GetPartnerDealsInformationUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private listPartnerDealsCategoriesUseCase: ListPartnerDealsCategoriesUseCase,
    private bitrixDealsRepository: IBitrixDealRepository,
  ) {}

  getWonDeals(bitrixDeals: BitrixDeal[]): BitrixDeal[] {
    if (bitrixDeals.length < 0) {
      return [];
    }
    const filteredDeals = bitrixDeals.filter(bitrixDeal => {
      const startOfStage = bitrixDeal.STAGE_ID.indexOf(':');
      if (startOfStage < 0) {
        return false;
      }
      const stageName = bitrixDeal.STAGE_ID.slice(startOfStage + 1);
      return stageName === 'WON';
    });
    return filteredDeals;
  }

  getActiveDeals(bitrixDeals: BitrixDeal[]): BitrixDeal[] {
    if (bitrixDeals.length < 0) {
      return [];
    }
    const filteredDeals = bitrixDeals.filter(bitrixDeal => {
      const startOfStage = bitrixDeal.STAGE_ID.indexOf(':');
      if (startOfStage < 0) {
        return false;
      }
      const stageName = bitrixDeal.STAGE_ID.slice(startOfStage + 1);
      return stageName !== 'LOSE';
    });
    return filteredDeals;
  }

  async execute(partnerID: string): Promise<GetPartnerDealsInformationSchema> {
    const partner = await this.partnersRepository.findById(partnerID);
    const associates = await this.partnersRepository.listAssociates(partnerID);
    const bitrixCompaniesID: number[] = [];
    for (let i = 0; i < associates.length; i += 1) {
      bitrixCompaniesID.push(associates[i].bitrix_id);
    }
    bitrixCompaniesID.push(partner.bitrix_id);
    const partnerDealCategories = await this.listPartnerDealsCategoriesUseCase.execute(
      partnerID,
    );
    const bitrixDealCategoriesID: number[] = [];
    for (let i = 0; i < partnerDealCategories.length; i += 1) {
      const dealCategory = partnerDealCategories[i]
        .dealCategory as DealCategory;
      bitrixDealCategoriesID.push(Number(dealCategory.bitrix_id));
    }
    let bitrixDeals: BitrixDeal[] = [];
    let isThereANextPage = false;
    let currentPage = 0;
    do {
      // eslint-disable-next-line no-await-in-loop
      const { result, next } = await this.bitrixDealsRepository.list({
        categoryID: bitrixDealCategoriesID,
        companyID: bitrixCompaniesID,
        page: currentPage,
      });
      bitrixDeals = [...bitrixDeals, ...result];
      isThereANextPage = typeof next !== 'undefined';
      currentPage = next;
    } while (isThereANextPage);
    const numberOfRegisteredAssociates = associates.length;
    const wonDeals = this.getWonDeals(bitrixDeals);
    const numberOfCompletedDeals = wonDeals.length;
    const { OPPORTUNITY: completedDealsAmount } =
      wonDeals.length > 0
        ? wonDeals.reduce((dealAccumulator, currentDeal) => ({
            ...dealAccumulator,
            OPPORTUNITY: dealAccumulator.OPPORTUNITY + currentDeal.OPPORTUNITY,
          }))
        : { OPPORTUNITY: 0 };
    const activeDeals = this.getActiveDeals(bitrixDeals);
    const numberOfActiveDeals = activeDeals.length;
    return {
      completedDealsAmount,
      numberOfActiveDeals,
      numberOfCompletedDeals,
      numberOfRegisteredAssociates,
    };
  }
}

export { GetPartnerDealsInformationUseCase };
