import AppError from '../../../../errors/AppError';
import { ICompanyRepository } from '../../../company/repositories/ICompanyRepository';
import { IBitrixContactRepository } from '../../repositories/IBitrixContactRepository';
import {
  IBitrixDealRepository,
  ICreateRealEstateDealDTO,
} from '../../repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../schemas/BitrixDeal';

interface IRequest extends Omit<ICreateRealEstateDealDTO, 'contactID'> {
  birthday: Date;
  cpf?: string;
  cnpj?: string;
}

class CreateRealEstateDealUseCase {
  constructor(
    private bitrixDealsRepository: IBitrixDealRepository,
    private bitrixContactsRepository: IBitrixContactRepository,
    private companiesRepository: ICompanyRepository,
  ) {}

  async execute({
    address,
    birthday,
    cnpj,
    companyID,
    cpf,
    creditType,
    email,
    name,
    opportunityValue,
    personType,
    phone,
    propertyID,
    propertyValue,
    term,
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
      cnpj,
      cpf,
      personType,
      phone,
    });
    const deal = await this.bitrixDealsRepository.CreateRealEstateDeal({
      address,
      companyID: String(company.bitrix_id),
      contactID: contact.ID,
      creditType,
      email,
      name,
      opportunityValue,
      personType,
      phone,
      propertyID,
      propertyValue,
      term,
    });
    return deal;
  }
}

export { CreateRealEstateDealUseCase };
