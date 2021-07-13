import BitwiseAnd from '../../../../../../utils/BitwiseAnd';

interface Request {
  rolePermissionValue: number;
  permissionValue: number;
}

class VerifyIfHasPermissionService {
  public execute({ permissionValue, rolePermissionValue }: Request): boolean {
    const hasPermission = BitwiseAnd(rolePermissionValue, permissionValue);
    return hasPermission;
  }
}

export default VerifyIfHasPermissionService;
