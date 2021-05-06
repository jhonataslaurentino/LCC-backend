import RoleModel from '../../Entities/Role';
import Role from '../../Schemas/Role';
import VerifyIfHasPermissionService from './VerifyIfHasPermissionService';

interface Request {
  roleID: string;
  permissionValue: number;
}

class AddPermissionToRoleService {
  public async execute({ roleID, permissionValue }: Request): Promise<Role> {
    const role = await RoleModel.findById(roleID);
    if (!role) {
      throw new Error('Role does not exists');
    }
    const verifyIfHasPermissionService = new VerifyIfHasPermissionService();
    const roleAlreadyHasPermission = verifyIfHasPermissionService.execute({
      rolePermissionValue: role.permissions,
      permissionValue,
    });
    if (roleAlreadyHasPermission) {
      throw new Error('Role already has permission');
    }
    role.permissions += permissionValue;
    await role.save();
    return role;
  }
}

export default AddPermissionToRoleService;
