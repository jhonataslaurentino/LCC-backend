import AppError from '../../../../../../errors/AppError';
import { CompanyModel } from '../../../../models/Company';
import Company from '../../../../schemas/Company';
import { IChangeCompanyEmailDTO } from '../../../ICompanyRepository';

class ChangeCompanyEmailService {
  async execute({
    companyID,
    newEmail,
  }: IChangeCompanyEmailDTO): Promise<Company> {
    const company = await CompanyModel.findById(companyID);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    company.email = newEmail;
    await company.save();
    return company;
  }
}

export { ChangeCompanyEmailService };
