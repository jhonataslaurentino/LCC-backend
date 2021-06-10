import DealCategoryModel from '../../../../Entities/DealCategory';
import AppError from '../../../../errors/AppError';
import DealCategory from '../../../../Schemas/DealCategory';
import { CompanyModel } from '../../../company/models/Company';
import { IFindByCompanyIDResponse } from '../../repositories/IBitrixDealRepository';
import { BitrixDealRepository } from '../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository';

interface IRequest {
  page?: number;
  dealCategoryID: string;
  companyID: string;
  bitrixDealCategoryID?: string;
}

class ListDealsByCompanyIDUseCase {
  constructor(private bitrixDealRepository: BitrixDealRepository) {}

  async execute({
    companyID,
    dealCategoryID,
    page = 0,
    bitrixDealCategoryID,
  }: IRequest): Promise<IFindByCompanyIDResponse> {
    const company = await CompanyModel.findById(companyID);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    let dealCategory = {} as DealCategory;
    if (!bitrixDealCategoryID) {
      dealCategory = await DealCategoryModel.findById(dealCategoryID);
      if (!dealCategory) {
        throw new AppError('Deal category not found', 404);
      }
    }
    const response = await this.bitrixDealRepository.findByCompanyID({
      category_id: bitrixDealCategoryID || dealCategory.bitrix_id,
      companyID: String(company.bitrix_id),
      page,
    });
    return response;
  }
}

export { ListDealsByCompanyIDUseCase };
