import { BitrixContactRepository } from '../../../Bitrix/repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { CompanyRepository } from '../../repositories/implementations/CompanyRepository/CompanyRepository';
import { GetCompanyContactUseCase } from './GetCompanyContactUseCase';

const companiesRepository = new CompanyRepository();
const bitrixContactsRepository = new BitrixContactRepository();
const getCompanyContactUseCase = new GetCompanyContactUseCase(
  companiesRepository,
  bitrixContactsRepository,
);

export { getCompanyContactUseCase };
