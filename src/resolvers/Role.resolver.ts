import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import permissions from '../config/permissions';
import { ContextData } from '../Context/context';
import AuthenticatedChecker from '../middlewares/AuthenticatedChecker';
import PermissionRequired from '../middlewares/PermissionRequired';
import Role from '../Modules/company/schemas/Role';
import { RoleRepository } from '../Modules/company/repositories/implementations/RoleRepository/RoleRepository';
import { getCompanyRoleUseCase } from '../Modules/company/useCases/GetCompanyRole';

@Resolver()
class RolesResolver {
  @Query(() => [Role], { nullable: true })
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async getRoles(): Promise<Role[]> {
    const rolesRepository = new RoleRepository();
    const roles = await rolesRepository.list();
    return roles;
  }

  @Query(() => Role)
  @UseMiddleware(AuthenticatedChecker)
  async getCompanyRole(
    @Ctx()
    context: ContextData,
  ): Promise<Role> {
    const { id: companyID } = context;
    const role = await getCompanyRoleUseCase.execute(companyID);
    return role;
  }
}

export default RolesResolver;
