import RoleModel from '../../Entities/Role';
import Role from '../../Schemas/Role';

class GetRolesService {
  public async execute(): Promise<Role[]> {
    const roles = await RoleModel.find({});
    return roles;
  }
}

export default GetRolesService;
