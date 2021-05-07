import CompanyModel from '../Entities/Company';
import RoleModel from '../Entities/Role';
import Company from '../Schemas/Company';

interface Request {
  roleID: string;
  companyID: string;
}

class ChangeCompanyRoleService {
  public async execute({ roleID, companyID }: Request): Promise<Company> {
    const company = await CompanyModel.findById(companyID);
    if (!company) {
      throw new Error('Company does not exists');
    }
    const role = await RoleModel.findById(roleID);
    if (!role) {
      throw new Error('Role does not exists');
    }
    company.roleId = role.id;
    await company.save();
    return company;
  }
}

export default ChangeCompanyRoleService;
