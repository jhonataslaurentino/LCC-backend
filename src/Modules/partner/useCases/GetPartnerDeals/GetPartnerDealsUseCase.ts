import AppError from '../../../../errors/AppError';
import { IBitrixDealRepository } from '../../../Bitrix/repositories/IBitrixDealRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { GetPartnerDealsSchema } from './GetPartnerDealsSchema';

interface IRequest {
  partnerID: string;
  page?: number;
  categoryID: number;
}

class GetPartnerDealsUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private bitrixDealsRepository: IBitrixDealRepository,
  ) {}

  async execute({
    partnerID,
    page,
    categoryID,
  }: IRequest): Promise<GetPartnerDealsSchema> {
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const associates = await this.partnersRepository.listAssociates(partnerID);
    const bitrixCompaniesID = [partner.bitrix_id];
    associates.forEach(({ bitrix_id }) => {
      bitrixCompaniesID.push(bitrix_id);
    });
    const partnerDeals = await this.bitrixDealsRepository.list({
      categoryID,
      companyID: bitrixCompaniesID,
      page,
    });
    return partnerDeals;
  }
}

export { GetPartnerDealsUseCase };
