import { RoleRepository } from '../../repositories/implementations/RoleRepository/RoleRepository';
import { GetDefaultRoleForCompanyByEmailUseCase } from './GetDefaultRoleForCompanyByEmailUseCase';

const rolesRepository = new RoleRepository();
const getDefaultRoleForCompanyByEmailUseCase = new GetDefaultRoleForCompanyByEmailUseCase(
  rolesRepository,
);

export { getDefaultRoleForCompanyByEmailUseCase };
