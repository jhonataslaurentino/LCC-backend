import { Ref } from '@typegoose/typegoose';
import Role from '../../../schemas/Role';
import {
  IAddRolePermission,
  IRemoveRolePermission,
  IRoleRepository,
  IVerifyIfHasPermissionDTO,
} from '../../IRoleRepository';
import AddPermissionToRoleService from './services/AddPermissionToRoleService';
import { FindRoleByIDService } from './services/FindRoleByIDService';
import { FindRoleByNameService } from './services/FindRoleByNameService';
import InsertDefaultRolesService from './services/InsertDefaultRolesService';
import { ListRolesService } from './services/ListRolesService';
import RemovePermissionFromRoleService from './services/RemovePermissionFromRoleService';
import { ResetRolePermissionsService } from './services/ResetRolePermissionsService';
import VerifyIfHasPermissionService from './services/VerifyIfHasPermissionService';

class RoleRepository implements IRoleRepository {
  async resetRolePermissions(id: string): Promise<Role> {
    const resetRolePermissionsService = new ResetRolePermissionsService();
    const role = await resetRolePermissionsService.execute(id);
    return role;
  }

  async removeRolePermission({
    id,
    value,
  }: IRemoveRolePermission): Promise<Role> {
    const removePermissionFromRoleService = new RemovePermissionFromRoleService();
    const role = await removePermissionFromRoleService.execute({
      permissionValue: value,
      roleID: id,
    });
    return role;
  }

  async list(): Promise<Role[]> {
    const listRolesService = new ListRolesService();
    const roles = await listRolesService.execute();
    return roles;
  }

  async findByID(id: string | Ref<Role>): Promise<Role> {
    const findRoleByIDService = new FindRoleByIDService();
    const role = await findRoleByIDService.execute(id);
    return role;
  }

  verifyIfHasPermission(data: IVerifyIfHasPermissionDTO): boolean {
    const verifyIfHasPermissionService = new VerifyIfHasPermissionService();
    const hasPermission = verifyIfHasPermissionService.execute(data);
    return hasPermission;
  }

  async addRolePermission({ id, value }: IAddRolePermission): Promise<Role> {
    const addPermissionToRoleService = new AddPermissionToRoleService();
    const role = await addPermissionToRoleService.execute({
      permissionValue: value,
      roleID: id,
    });
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const findRoleByNameService = new FindRoleByNameService();
    const role = findRoleByNameService.execute(name);
    return role;
  }

  async insertDefaultRoles(): Promise<void> {
    const insertDefaultRolesService = new InsertDefaultRolesService();
    await insertDefaultRolesService.execute();
  }
}

export { RoleRepository };
