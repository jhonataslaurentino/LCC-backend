import AppError from '../../../../errors/AppError';
import { IBitrixDealRepository } from '../../../Bitrix/repositories/IBitrixDealRepository';
import { DealCategory } from '../../../deal/schemas/DealCategory';
import { IPartnerDealCategoryRepository } from '../../repositories/IPartnerDealCategoryRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';
import { GetPartnerDealsSchema } from './GetPartnerDealsSchema';

interface IRequest {
  partnerID: string;
  page?: number;
  dealCategoryID?: string;
}

class GetPartnerDealsUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private bitrixDealsRepository: IBitrixDealRepository,
    private partnerDealCategoriesRepository: IPartnerDealCategoryRepository,
  ) {}

  async execute({
    partnerID,
    page,
    dealCategoryID,
  }: IRequest): Promise<GetPartnerDealsSchema> {
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const isAMasterPartner = !partner.createdBy;
    const masterPartner = isAMasterPartner
      ? partner
      : (partner.createdBy as Partner);
    const associates = await this.partnersRepository.listAssociates(partnerID);

    const bitrixDealsCategoriesID: number[] = [];
    if (dealCategoryID) {
      const partnerDealCategory = await this.partnerDealCategoriesRepository.findByID(
        dealCategoryID,
      );
      const dealCategory = partnerDealCategory.dealCategory as DealCategory;
      bitrixDealsCategoriesID.push(Number(dealCategory.bitrix_id));
    } else {
      const partnerDealCategories = await this.partnerDealCategoriesRepository.findByPartner(
        isAMasterPartner ? partner.id : masterPartner.id,
      );
      partnerDealCategories.forEach(partnerDealCategory => {
        const dealCategory = partnerDealCategory.dealCategory as DealCategory;
        bitrixDealsCategoriesID.push(Number(dealCategory.bitrix_id));
      });
    }
    const bitrixCompaniesID = [partner.bitrix_id];
    associates.forEach(({ bitrix_id }) => {
      bitrixCompaniesID.push(bitrix_id);
    });

    const partnerDeals = await this.bitrixDealsRepository.list({
      categoryID: bitrixDealsCategoriesID,
      companyID: bitrixCompaniesID,
      page,
    });
    return partnerDeals;
  }
}

export { GetPartnerDealsUseCase };
