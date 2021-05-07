import RoleModel from '../../Entities/Role';
import Role from '../../Schemas/Role';
import InsertDefaultRolesService from './InsertDefaultRolesService';

class GetDefaultRoleService {
  public async execute(): Promise<Role> {
    const UserRole = await RoleModel.findOne({
      name: 'User',
    });
    if (!UserRole) {
      const insertDefaultRolesService = new InsertDefaultRolesService();
      await insertDefaultRolesService.execute();
      throw new Error('Default role does not exists');
    }
    return UserRole;
  }
}

export default GetDefaultRoleService;
