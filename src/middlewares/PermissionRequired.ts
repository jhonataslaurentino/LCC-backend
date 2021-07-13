import { MiddlewareFn, NextFn, ResolverData } from 'type-graphql';
import { ContextData } from '../Context/context';
import { CompanyModel } from '../modules/company/models/Company';
import RoleModel from '../modules/company/models/Role';
import { RoleRepository } from '../modules/company/repositories/implementations/RoleRepository/RoleRepository';
import { getDefaultRoleForCompanyByEmailUseCase } from '../modules/company/useCases/GetDefaultRoleForCompanyByEmail';

function PermissionRequired(
  permissionValues: number[],
): MiddlewareFn<ContextData> {
  return async ({ context }: ResolverData<ContextData>, next: NextFn) => {
    const { id } = context;
    const company = await CompanyModel.findById(id);
    if (!company) {
      throw new Error('Company does not exists');
    }
    if (!company.roleId) {
      const defaultRole = await getDefaultRoleForCompanyByEmailUseCase.execute(
        company.email,
      );
      company.roleId = defaultRole;
      await company.save();
    }
    const rolesRepository = new RoleRepository();
    const companyRole = await RoleModel.findById(company.roleId);
    permissionValues.forEach(async permissionValue => {
      const hasPermission = rolesRepository.verifyIfHasPermission({
        permissionValue,
        rolePermissionValue: companyRole.permissions,
      });
      if (!hasPermission) {
        throw new Error('You do not have permission to access this area');
      }
    });
    return next();
  };
}

export default PermissionRequired;
