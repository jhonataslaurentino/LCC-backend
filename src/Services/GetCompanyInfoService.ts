import { CompanyModel } from '../modules/company/models/Company';
import Company from '../modules/company/schemas/Company';

interface Request {
  id: string;
}

class GetCompanyInfoService {
  public async execute({ id }: Request): Promise<Company> {
    const company = await CompanyModel.findById(id).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }
    return company;
  }
}

export default GetCompanyInfoService;
