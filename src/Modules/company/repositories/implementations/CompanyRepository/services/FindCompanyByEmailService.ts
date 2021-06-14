import { CompanyModel } from '../../../../models/Company';
import Company from '../../../../schemas/Company';

class FindCompanyByEmailService {
  async execute(email: string): Promise<Company | null> {
    const company = await CompanyModel.findOne({
      email,
    });

    return company;
  }
}

export { FindCompanyByEmailService };
