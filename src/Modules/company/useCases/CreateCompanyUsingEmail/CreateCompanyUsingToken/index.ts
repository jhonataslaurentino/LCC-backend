import { BitrixCompanyRepository } from '../../../../Bitrix/repositories/Implementations/BitrixCompanyRepository/BitrixCompanyRepository';
import { CompanyRepository } from '../../../repositories/implementations/CompanyRepository/CompanyRepository';
import { RoleRepository } from '../../../repositories/implementations/RoleRepository/RoleRepository';
import { CreateCompanyUsingEmailUseCase } from './CreateCompanyUsingEmailUseCase';

const companiesRepository = new CompanyRepository();
const bitrixCompaniesRepository = new BitrixCompanyRepository();
const rolesRepository = new RoleRepository();
const createCompanyUsingEmailUseCase = new CreateCompanyUsingEmailUseCase(
  companiesRepository,
  bitrixCompaniesRepository,
  rolesRepository,
);
export { createCompanyUsingEmailUseCase };
