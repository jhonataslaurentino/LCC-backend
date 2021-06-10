import { CompanyModel } from '../../../../models/Company';
import Company from '../../../../schemas/Company';

class ListAllCompaniesService {
  async execute(): Promise<Company[]> {
    const companies = await CompanyModel.find();
    return companies;
  }
}

export { ListAllCompaniesService };
