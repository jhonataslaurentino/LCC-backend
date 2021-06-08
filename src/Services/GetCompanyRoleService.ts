// import { CompanyModel } from '../Modules/company/models/Company';

// interface Request {
//   companyID: string;
// }

// class GetCompanyRoleService {
//   public async execute({ companyID }: Request): Promise<Role> {
//     const company = await CompanyModel.findById(companyID);
//     if (!company) {
//       throw new Error('Company does not exists');
//     }
//     const getRoleService = new GetRoleService();
//     const role = await getRoleService.execute({ roleID: company.roleId });
//     return role;
//   }
// }

// export default GetCompanyRoleService;
