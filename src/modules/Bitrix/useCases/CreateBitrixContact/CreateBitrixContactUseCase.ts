import AppError from '../../../../errors/AppError';
import { BitrixContact } from '../../schemas/BitrixContact';
import {
  IBitrixContactRepository,
  ICreateBitrixContactData,
} from '../../repositories/IBitrixContactRepository';
import { CompanyModel } from '../../../company/models/Company';

interface IRequest extends Omit<ICreateBitrixContactData, 'companyID'> {
  companyID: string;
}

class CreateBitrixContactUseCase {
  constructor(private bitrixContactRepository: IBitrixContactRepository) {}

  async execute({
    companyID,
    email,
    name,
    phone,
    personType,
    birthday,
  }: IRequest): Promise<BitrixContact> {
    const company = await CompanyModel.findById(companyID);
    if (!company) {
      throw new AppError('Company not found', 404);
    }
    const contact = await this.bitrixContactRepository.create({
      companyID: company.bitrix_id,
      email,
      name,
      phone,
      personType,
      birthday,
    });

    return contact;
  }
}

export { CreateBitrixContactUseCase };
