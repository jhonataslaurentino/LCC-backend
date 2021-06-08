import endpointsConfig from '../../../../config/endpoints.config';
import { IRoleRepository } from '../../repositories/IRoleRepository';
import Role from '../../schemas/Role';

class GetDefaultRoleForCompanyByEmailUseCase {
  constructor(private rolesRepository: IRoleRepository) {}

  async execute(companyEmail: string): Promise<Role> {
    const isAdmin = endpointsConfig.administratorsEmails.includes(companyEmail);
    const UserRole = await this.rolesRepository.findByName(
      isAdmin ? 'Administrator' : 'User',
    );
    if (!UserRole) {
      throw new Error('Default role does not exists');
    }
    return UserRole;
  }
}

export { GetDefaultRoleForCompanyByEmailUseCase };
