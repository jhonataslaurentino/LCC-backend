import endpointsConfig from '../../config/endpoints.config';
import RoleModel from '../../Entities/Role';
import Role from '../../Schemas/Role';
import InsertDefaultRolesService from './InsertDefaultRolesService';

interface Request {
  companyEmail: string;
}

class GetDefaultRoleService {
  public async execute({ companyEmail }: Request): Promise<Role> {
    const isAdmin = endpointsConfig.administratorsEmails.includes(companyEmail);
    const UserRole = await RoleModel.findOne({
      name: isAdmin ? 'Administrator' : 'User',
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
