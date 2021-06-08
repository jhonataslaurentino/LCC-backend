import AppError from '../../../../errors/AppError';
import { CompanyModel } from '../../../company/models/Company';
import { IBitrixDealRepository } from '../../repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../schemas/BitrixDeal';

interface IGetBitrixDealUseCaseDTO {
  companyID: string;
  dealID: string;
}

class GetBitrixDealUseCase {
  constructor(private bitrixDealsRepository: IBitrixDealRepository) {}

  async execute({
    companyID,
    dealID,
  }: IGetBitrixDealUseCaseDTO): Promise<BitrixDeal> {
    const company = await CompanyModel.findById(companyID);
    if (!company) {
      throw new AppError('Company not found', 404);
    }
    const deal = await this.bitrixDealsRepository.findByID(dealID);
    if (deal.COMPANY_ID !== company.bitrix_id) {
      throw new AppError('Unauthorized', 401);
    }
    return deal;
  }
}

export { GetBitrixDealUseCase };
