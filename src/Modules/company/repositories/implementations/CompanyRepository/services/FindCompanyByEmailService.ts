import AppError from '../../../../../../errors/AppError';
import { CompanyModel } from '../../../../models/Company';
import Company from '../../../../schemas/Company';

class FindCompanyByEmailService {
  async execute(email: string): Promise<Company> {
    const company = await CompanyModel.findOne({
      email,
    });
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    return company;
  }
}

export { FindCompanyByEmailService };
