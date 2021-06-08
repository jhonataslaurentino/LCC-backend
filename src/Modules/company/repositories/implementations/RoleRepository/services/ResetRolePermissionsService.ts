import RoleModel from '../../../../models/Role';
import Role from '../../../../schemas/Role';

class ResetRolePermissionsService {
  public async execute(roleID: string): Promise<Role> {
    const role = await RoleModel.findById(roleID);
    if (!role) {
      throw new Error('Role does not exists');
    }
    role.permissions = 0;
    await role.save();
    return role;
  }
}

export { ResetRolePermissionsService };
