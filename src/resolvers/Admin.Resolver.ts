import { Resolver, UseMiddleware, Query } from 'type-graphql';
import permissions from '../config/permissions';
import AuthenticatedChecker from '../middlewares/AuthenticatedChecker';
import PermissionRequired from '../middlewares/PermissionRequired';
import GetAdminDataService from '../Services/GetAdminDataService';
import GetAdminDataResponse from './types/Admin/GetAdminDataResponse';

@Resolver()
class AdminResolver {
  @Query(() => GetAdminDataResponse)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async getAdminData(): Promise<GetAdminDataResponse> {
    const getAdminDataService = new GetAdminDataService();
    const adminData = await getAdminDataService.execute();
    return adminData;
  }
}

export default AdminResolver;
