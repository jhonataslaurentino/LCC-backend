import RoleModel from '../../../../models/Role';
import Role from '../../../../schemas/Role';

class ListRolesService {
  async execute(): Promise<Role[]> {
    const roles = await RoleModel.find();
    return roles;
  }
}

export { ListRolesService };
