import { MiddlewareFn, NextFn, ResolverData } from 'type-graphql';
import { ContextData } from '../../../Context/context';
import AppError from '../../../errors/AppError';
import RoleModel from '../../company/models/Role';
import { RoleRepository } from '../../company/repositories/implementations/RoleRepository/RoleRepository';
import { PartnerRepository } from '../repositories/implementations/PartnerRepository';

function PartnerPermissionRequired(
  permissionValues: number[],
): MiddlewareFn<ContextData> {
  return async ({ context }: ResolverData<ContextData>, next: NextFn) => {
    const { id } = context;
    const partnersRepository = new PartnerRepository();
    const partner = await partnersRepository.findById(id);
    if (!partner) {
      throw new AppError('Company does not exists', 404);
    }
    const rolesRepository = new RoleRepository();
    const partnerRole = await RoleModel.findById(partner.roleID);
    permissionValues.forEach(permissionValue => {
      const hasPermission = rolesRepository.verifyIfHasPermission({
        permissionValue,
        rolePermissionValue: partnerRole.permissions,
      });
      if (!hasPermission) {
        throw new AppError('You do not have permission to access this area');
      }
    });
    return next();
  };
}

export { PartnerPermissionRequired };
