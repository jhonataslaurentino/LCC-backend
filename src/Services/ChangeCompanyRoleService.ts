import { CompanyModel } from '../modules/company/models/Company';
import { RoleRepository } from '../modules/company/repositories/implementations/RoleRepository/RoleRepository';
import Company from '../modules/company/schemas/Company';

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
    const rolesRepository = new RoleRepository();
    const role = await rolesRepository.findByID(roleID);
    if (!role) {
      throw new Error('Role does not exists');
    }
    company.roleId = role;
    await company.save();
    return company;
  }
}

export default ChangeCompanyRoleService;
