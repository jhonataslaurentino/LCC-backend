import AppError from '../../../../errors/AppError';
import { ICompanyRepository } from '../../../company/repositories/ICompanyRepository';
import { IBitrixContactRepository } from '../../repositories/IBitrixContactRepository';
import {
  IBitrixDealRepository,
  ICreatePersonalDealDTO,
} from '../../repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../schemas/BitrixDeal';

interface IRequest extends Omit<ICreatePersonalDealDTO, 'contactID'> {
  email: string;
  name: string;
  phone: string;
  personType: string;
}

class CreatePersonalDealUseCase {
  constructor(
    private bitrixDealsRepository: IBitrixDealRepository,
    private companiesRepository: ICompanyRepository,
    private bitrixContactsRepository: IBitrixContactRepository,
  ) {}

  async execute({
    CNH,
    birthday,
    companyID,
    cpf,
    opportunityValue,
    proofOfAddress,
    typeOfContract,
    email,
    name,
    phone,
    personType,
  }: IRequest): Promise<BitrixDeal> {
    const company = await this.companiesRepository.findByID(companyID);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    const contact = await this.bitrixContactsRepository.create({
      birthday,
      companyID: company.bitrix_id,
      email,
      name,
      cpf,
      personType,
      phone,
    });
    const personalDeal = await this.bitrixDealsRepository.CreatePersonalDeal({
      CNH,
      birthday,
      companyID: String(company.bitrix_id),
      contactID: contact.ID,
      cpf,
      opportunityValue,
      proofOfAddress,
      typeOfContract,
    });
    return personalDeal;
  }
}

export { CreatePersonalDealUseCase };
