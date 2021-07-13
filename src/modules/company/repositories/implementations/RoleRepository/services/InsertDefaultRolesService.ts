import permissions from '../../../../../../config/permissions';
import BitwiseAnd from '../../../../../../utils/BitwiseAnd';
import RoleModel from '../../../../models/Role';

class InsertDefaultRolesService {
  public async execute(): Promise<void> {
    const roles = {
      User: [permissions.requestCredit],
      Company: [
        permissions.visualizeAssociatedUsers,
        permissions.visualizeAssociatedUsersBusiness,
        permissions.requestAssociatedUsersCredit,
        permissions.createAssociatedUser,
        permissions.deleteAssociatedUser,
        permissions.changePlatformColorsAndLogo,
        permissions.visualizeCommissions,
        permissions.requestCredit,
        permissions.addPartnerDealCategory,
        permissions.deletePartnerDealCategory,
      ],
      Administrator: Object.values(permissions),
    };

    const rolesEntries = Object.entries(roles);
    rolesEntries.forEach(async ([permissionName, permissionValues]) => {
      const existentRole = await RoleModel.findOne({
        name: permissionName,
      });

      if (!existentRole) {
        const role = await RoleModel.create({
          name: permissionName,
          permissions: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          companies: [],
        });
        permissionValues.forEach(async permissionValue => {
          const hasPermission = BitwiseAnd(role.permissions, permissionValue);
          if (!hasPermission) {
            role.permissions += permissionValue;
          }
        });
        await role.save();
      } else {
        permissionValues.forEach(async permissionValue => {
          const hasPermission = BitwiseAnd(
            existentRole.permissions,
            permissionValue,
          );
          if (!hasPermission) {
            existentRole.permissions += permissionValue;
          }
        });
        await existentRole.save();
      }
    });
  }
}

export default InsertDefaultRolesService;
