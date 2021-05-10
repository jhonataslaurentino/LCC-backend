import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import permissions from '../config/permissions';
import { ContextData } from '../Context/context';
import AuthenticatedChecker from '../middlewares/AuthenticatedChecker';
import PermissionRequired from '../middlewares/PermissionRequired';
import Role from '../Schemas/Role';
import GetCompanyRoleService from '../Services/GetCompanyRoleService';
import GetRolesService from '../Services/Roles/GetRolesService';
import GetPermissionByNameService from '../Services/Roles/GetPermissionByNameService';
import VerifyIfHasPermissionService from '../Services/Roles/VerifyIfHasPermissionService';
import HasPermissionInput from './types/Role/HasPermissionInput';

@Resolver()
class RolesResolver {
  @Query(() => [Role], { nullable: true })
  @UseMiddleware(AuthenticatedChecker, PermissionRequired(permissions.admin))
  async getRoles(): Promise<Role[]> {
    const getRolesService = new GetRolesService();
    const roles = await getRolesService.execute();
    return roles;
  }

  @Query(() => Role)
  @UseMiddleware(AuthenticatedChecker)
  async getCompanyRole(
    @Ctx()
    context: ContextData,
  ): Promise<Role> {
    const { id: companyID } = context;
    const getCompanyRoleService = new GetCompanyRoleService();
    const role = await getCompanyRoleService.execute({ companyID });
    return role;
  }

  @Query(() => Boolean)
  @UseMiddleware(AuthenticatedChecker)
  async hasPermission(
    @Arg('data') { permissionName }: HasPermissionInput,
    @Ctx()
    context: ContextData,
  ): Promise<boolean> {
    const { id: companyID } = context;
    const getCompanyRoleService = new GetCompanyRoleService();
    const companyRole = await getCompanyRoleService.execute({
      companyID,
    });

    const getPermissionByNameService = new GetPermissionByNameService();
    const permissionFiltered = getPermissionByNameService.execute({
      permissionName,
    });

    const verifyIfHasPermissionService = new VerifyIfHasPermissionService();

    const hasPermission = verifyIfHasPermissionService.execute({
      permissionValue: permissionFiltered.value,
      rolePermissionValue: companyRole.permissions,
    });
    return hasPermission;
  }
}

export default RolesResolver;
