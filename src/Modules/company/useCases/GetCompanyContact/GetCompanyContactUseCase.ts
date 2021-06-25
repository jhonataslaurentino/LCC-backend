import AppError from '../../../../errors/AppError';
import { IBitrixContactRepository } from '../../../Bitrix/repositories/IBitrixContactRepository';
import { BitrixContact } from '../../../Bitrix/schemas/BitrixContact';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';

interface IGetContactUseCase {
  companyID: string;
  contactID: number;
}

class GetCompanyContactUseCase {
  constructor(
    private companiesRepository: ICompanyRepository,
    private bitrixContactsRepository: IBitrixContactRepository,
  ) {}

  async execute({
    companyID,
    contactID,
  }: IGetContactUseCase): Promise<BitrixContact> {
    const company = await this.companiesRepository.findByID(companyID);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    const contact = await this.bitrixContactsRepository.findByID(contactID);
    if (!contact) {
      throw new AppError('Contact does not exists', 404);
    }
    if (Number(company.bitrix_id) !== Number(contact.COMPANY_ID)) {
      throw new AppError('You cannot access this contact');
    }
    return contact;
  }
}

export { GetCompanyContactUseCase };
