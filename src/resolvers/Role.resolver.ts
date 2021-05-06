import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import AuthenticatedChecker, {
  ContextData,
} from '../middlewares/AuthenticatedChecker';
import Role from '../Schemas/Role';
import GetRolesService from '../Services/Roles/GetRolesService';

@Resolver()
class RolesResolver {
  @Query(() => [Role], { nullable: true })
  async getRoles(): Promise<Role[]> {
    const getRolesService = new GetRolesService();
    const roles = await getRolesService.execute();
    return roles;
  }
}

export default RolesResolver;
