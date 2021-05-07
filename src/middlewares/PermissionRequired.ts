import { MiddlewareFn, NextFn, ResolverData } from 'type-graphql';
import { ContextData } from '../Context/context';
import CompanyModel from '../Entities/Company';
import RoleModel from '../Entities/Role';
import GetDefaultRoleService from '../Services/Roles/GetDefaultRoleService';
import VerifyIfHasPermissionService from '../Services/Roles/VerifyIfHasPermissionService';

function PermissionRequired(
  permissionValue: number,
): MiddlewareFn<ContextData> {
  return async ({ context }: ResolverData<ContextData>, next: NextFn) => {
    const { id } = context;
    const company = await CompanyModel.findById(id);
    if (!company) {
      throw new Error('Company does not exists');
    }
    if (!company.roleId) {
      const getDefaultRoleService = new GetDefaultRoleService();
      const defaultRole = await getDefaultRoleService.execute();
      company.roleId = defaultRole.id;
      await company.save();
    }
    const companyRole = await RoleModel.findById(company.roleId);
    const verifyIfHasPermissionService = new VerifyIfHasPermissionService();
    const hasPermission = verifyIfHasPermissionService.execute({
      permissionValue,
      rolePermissionValue: companyRole.permissions,
    });
    if (!hasPermission) {
      throw new Error('You do not have permission to access this area');
    }
    return next();
  };
}

export default PermissionRequired;
