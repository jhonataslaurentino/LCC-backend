import AppError from '../../../../errors/AppError';
import GetDealsResponse from '../../../../Schemas/GetDealsResponse';
import { CompanyModel } from '../../../company/models/Company';
import { DealCategoryModel } from '../../../deal/models/DealCategory';
import { DealCategory } from '../../../deal/schemas/DealCategory';
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
  }: IRequest): Promise<GetDealsResponse> {
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
      category_id: bitrixDealCategoryID || String(dealCategory.bitrix_id),
      companyID: String(company.bitrix_id),
      page,
    });
    return response;
  }
}

export { ListDealsByCompanyIDUseCase };
