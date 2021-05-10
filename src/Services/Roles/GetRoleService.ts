import RoleModel from '../../Entities/Role';
import Role from '../../Schemas/Role';

interface Request {
  roleID: string;
}

class GetRoleService {
  public async execute({ roleID }: Request): Promise<Role> {
    const role = await RoleModel.findById(roleID);
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  }
}

export default GetRoleService;
