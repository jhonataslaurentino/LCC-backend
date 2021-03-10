import CompanyModel from '../Entities/Company';
import Company from '../Schemas/Company';

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
