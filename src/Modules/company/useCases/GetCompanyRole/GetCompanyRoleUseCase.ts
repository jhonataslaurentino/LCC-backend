import AppError from '../../../../errors/AppError';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';
import { IRoleRepository } from '../../repositories/IRoleRepository';
import Role from '../../schemas/Role';

class GetCompanyRoleUseCase {
  constructor(
    private companiesRepository: ICompanyRepository,
    private rolesRepository: IRoleRepository,
  ) {}

  async execute(companyID: string): Promise<Role> {
    const company = await this.companiesRepository.findByID(companyID);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    const role = this.rolesRepository.findByID(company.roleId);
    return role;
  }
}

export { GetCompanyRoleUseCase };
