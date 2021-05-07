import RoleModel from '../../Entities/Role';
import Role from '../../Schemas/Role';

interface Request {
  roleID: string;
}

class ResetRolePermissionsService {
  public async execute({ roleID }: Request): Promise<Role> {
    const role = await RoleModel.findById(roleID);
    if (!role) {
      throw new Error('Role does not exists');
    }
    role.permissions = 0;
    await role.save();
    return role;
  }
}

export default ResetRolePermissionsService;
