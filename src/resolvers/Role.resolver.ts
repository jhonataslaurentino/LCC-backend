import { Query, Resolver, UseMiddleware } from 'type-graphql';
import permissions from '../config/permissions';
import AuthenticatedChecker from '../middlewares/AuthenticatedChecker';
import PermissionRequired from '../middlewares/PermissionRequired';
import Role from '../Schemas/Role';
import GetRolesService from '../Services/Roles/GetRolesService';

@Resolver()
class RolesResolver {
  @Query(() => [Role], { nullable: true })
  @UseMiddleware(AuthenticatedChecker, PermissionRequired(permissions.admin))
  async getRoles(): Promise<Role[]> {
    const getRolesService = new GetRolesService();
    const roles = await getRolesService.execute();
    return roles;
  }
}

export default RolesResolver;
