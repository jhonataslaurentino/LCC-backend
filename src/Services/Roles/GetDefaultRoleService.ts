import CompanyModel from '../../Entities/Company';
import RoleModel from '../../Entities/Role';
import Role from '../../Schemas/Role';
import InsertDefaultRolesService from './InsertDefaultRolesService';

interface Request {
  companyEmail: string;
}

class GetDefaultRoleService {
  public async execute({ companyEmail }: Request): Promise<Role> {
    const adminEmails = [
      'gledson.leytte@gmail.com',
      'allan@lucrandocomcredito.com.br',
      'adm@federalrn.com.br',
      'sheyla@federalrn.com.br',
    ];
    const isAdmin = companyEmail in adminEmails;
    const UserRole = await RoleModel.findOne({
      name: isAdmin ? 'Admin' : 'User',
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
