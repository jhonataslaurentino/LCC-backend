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
  }: IRequest): Promise<BitrixContact> {
    const company = await CompanyModel.findById(companyID);
    if (!company) {
      throw new AppError('Company not found', 404);
    }
    const contactID = await this.bitrixContactRepository.create({
      companyID: company.bitrix_id,
      email,
      name,
      phone,
      personType,
    });

    const contact = await this.bitrixContactRepository.findByID(contactID);
    return contact;
  }
}

export { CreateBitrixContactUseCase };
