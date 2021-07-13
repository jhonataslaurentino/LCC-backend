import RoleModel from '../../../../models/Role';
import Role from '../../../../schemas/Role';
import VerifyIfHasPermissionService from './VerifyIfHasPermissionService';

interface Request {
  roleID: string;
  permissionValue: number;
}

class RemovePermissionFromRoleService {
  public async execute({ roleID, permissionValue }: Request): Promise<Role> {
    const role = await RoleModel.findById(roleID);
    if (!role) {
      throw new Error('Role does not exists');
    }
    const verifyIfHasPermissionService = new VerifyIfHasPermissionService();
    const hasPermission = verifyIfHasPermissionService.execute({
      rolePermissionValue: role.permissions,
      permissionValue,
    });
    if (!hasPermission) {
      throw new Error('Role does not have this permission');
    }
    role.permissions -= permissionValue;
    await role.save();
    return role;
  }
}

export default RemovePermissionFromRoleService;
