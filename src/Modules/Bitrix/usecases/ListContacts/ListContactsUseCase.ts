import CompanyModel from '../../../../Entities/Company';
import AppError from '../../../../errors/AppError';
import {
  IBitrixContactRepository,
  IListByCompanyIDResponse,
} from '../../repositories/IBitrixContactRepository';

interface IRequest {
  companyID: string;
  page?: number;
}

class ListContactsUseCase {
  constructor(private bitrixContactRepository: IBitrixContactRepository) {}

  async execute({
    companyID,
    page = 0,
  }: IRequest): Promise<IListByCompanyIDResponse> {
    const company = await CompanyModel.findById(companyID);
    if (!company) {
      throw new AppError('Company not found', 404);
    }
    const response = await this.bitrixContactRepository.ListByCompanyID({
      bitrixCompanyID: company.bitrix_id,
      page,
    });
    return response;
  }
}

export { ListContactsUseCase };
