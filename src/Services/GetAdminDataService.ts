import { CompanyModel } from '../modules/company/models/Company';

interface Response {
  activeAccounts: number;
  inactiveAccounts: number;
  numberOfPlatformAccess: number;
  numberOfNewBusiness: number;
}

class GetAdminDataService {
  public async execute(): Promise<Response> {
    const activeAccounts = await CompanyModel.countDocuments({});
    return {
      activeAccounts,
      inactiveAccounts: 0,
      numberOfPlatformAccess: 0,
      numberOfNewBusiness: 0,
    };
  }
}

export default GetAdminDataService;
