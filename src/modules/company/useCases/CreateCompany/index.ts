import { BitrixCompanyRepository } from '../../../Bitrix/repositories/Implementations/BitrixCompanyRepository/BitrixCompanyRepository';
import { CompanyRepository } from '../../repositories/implementations/CompanyRepository/CompanyRepository';
import { RoleRepository } from '../../repositories/implementations/RoleRepository/RoleRepository';
import { CreateCompanyUseCase } from './CreateCompanyUseCase';

const companiesRepository = new CompanyRepository();
const bitrixCompaniesRepository = new BitrixCompanyRepository();
const rolesRepository = new RoleRepository();
const createCompanyUseCase = new CreateCompanyUseCase(
  companiesRepository,
  bitrixCompaniesRepository,
  rolesRepository,
);

export { createCompanyUseCase };
