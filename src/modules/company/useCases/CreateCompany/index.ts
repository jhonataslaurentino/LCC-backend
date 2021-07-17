import { BitrixCompanyRepository } from '../../../Bitrix/repositories/Implementations/BitrixCompanyRepository/BitrixCompanyRepository';
import { CompanyRepository } from '../../repositories/implementations/CompanyRepository/CompanyRepository';
import { CreateCompanyUseCase } from './CreateCompanyUseCase';

const companiesRepository = new CompanyRepository();
const bitrixCompaniesRepository = new BitrixCompanyRepository();
const createCompanyUseCase = new CreateCompanyUseCase(
  companiesRepository,
  bitrixCompaniesRepository,
);

export { createCompanyUseCase };
