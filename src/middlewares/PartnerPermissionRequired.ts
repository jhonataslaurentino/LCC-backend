import { MiddlewareFn, NextFn, ResolverData } from 'type-graphql';
import { ContextData } from '../Context/context';
import RoleModel from '../Modules/company/models/Role';
import { RoleRepository } from '../Modules/company/repositories/implementations/RoleRepository/RoleRepository';
import { PartnerRepository } from '../Modules/partner/repositories/implementations/PartnerRepository';

function PartnerPermissionRequired(
  permissionValues: number[],
): MiddlewareFn<ContextData> {
  return async ({ context }: ResolverData<ContextData>, next: NextFn) => {
    const { id } = context;
    const partnersRepository = new PartnerRepository();
    const partner = await partnersRepository.findById(id);
    if (!partner) {
      throw new Error('Company does not exists');
    }
    const rolesRepository = new RoleRepository();
    const partnerRole = await RoleModel.findById(partner.roleID);
    permissionValues.forEach(async permissionValue => {
      const hasPermission = rolesRepository.verifyIfHasPermission({
        permissionValue,
        rolePermissionValue: partnerRole.permissions,
      });
      if (!hasPermission) {
        throw new Error('You do not have permission to access this area');
      }
    });
    return next();
  };
}

export { PartnerPermissionRequired };
