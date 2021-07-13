import { BitrixCompanyRepository } from '../../../Bitrix/repositories/Implementations/BitrixCompanyRepository/BitrixCompanyRepository';
import { CompanyRepository } from '../../repositories/implementations/CompanyRepository/CompanyRepository';
import { ChangeCompanyEmailUseCase } from './ChangeCompanyEmailUseCase';

const companiesRepository = new CompanyRepository();
const bitrixCompaniesRepository = new BitrixCompanyRepository();
const changeCompanyEmailUseCase = new ChangeCompanyEmailUseCase(
  companiesRepository,
  bitrixCompaniesRepository,
);

export { changeCompanyEmailUseCase };
