import { Ref } from '@typegoose/typegoose';
import RoleModel from '../../../../models/Role';
import Role from '../../../../schemas/Role';

class FindRoleByIDService {
  async execute(id: string | Ref<Role>): Promise<Role> {
    const role = await RoleModel.findById(id);
    return role;
  }
}

export { FindRoleByIDService };
