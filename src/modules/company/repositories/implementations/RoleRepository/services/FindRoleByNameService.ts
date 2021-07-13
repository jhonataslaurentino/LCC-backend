import RoleModel from '../../../../models/Role';
import Role from '../../../../schemas/Role';

class FindRoleByNameService {
  async execute(name: string): Promise<Role> {
    const role = await RoleModel.findOne({
      name,
    });
    return role;
  }
}

export { FindRoleByNameService };
