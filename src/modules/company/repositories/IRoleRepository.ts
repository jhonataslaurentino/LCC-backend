import { Ref } from '@typegoose/typegoose';
import Role from '../schemas/Role';

interface IVerifyIfHasPermissionDTO {
  rolePermissionValue: number;
  permissionValue: number;
}

interface IAddRolePermission {
  id: string;
  value: number;
}

interface IRemoveRolePermission {
  id: string;
  value: number;
}

interface IRoleRepository {
  insertDefaultRoles(): Promise<void>;
  findByID(id: string | Ref<Role>): Promise<Role>;
  findByName(name: string): Promise<Role>;
  verifyIfHasPermission(data: IVerifyIfHasPermissionDTO): boolean;
  addRolePermission(data: IAddRolePermission): Promise<Role>;
  removeRolePermission(data: IRemoveRolePermission): Promise<Role>;
  list(): Promise<Role[]>;
  resetRolePermissions(id: string): Promise<Role>;
}

export {
  IRoleRepository,
  IVerifyIfHasPermissionDTO,
  IAddRolePermission,
  IRemoveRolePermission,
};
