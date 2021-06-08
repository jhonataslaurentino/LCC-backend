import { CompanyRepository } from '../../repositories/implementations/CompanyRepository/CompanyRepository';
import { RoleRepository } from '../../repositories/implementations/RoleRepository/RoleRepository';
import { GetCompanyRoleUseCase } from './GetCompanyRoleUseCase';

const rolesRepository = new RoleRepository();
const companiesRepository = new CompanyRepository();

const getCompanyRoleUseCase = new GetCompanyRoleUseCase(
  companiesRepository,
  rolesRepository,
);

export { getCompanyRoleUseCase };
