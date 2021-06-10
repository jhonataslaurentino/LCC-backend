import { hash } from 'bcryptjs';
import AppError from '../../../../../../errors/AppError';
import { CompanyModel } from '../../../../models/Company';
import Company from '../../../../schemas/Company';
import { IChangePasswordDTO } from '../../../ICompanyRepository';

class ChangeCompanyPasswordService {
  async execute({ id, newPassword }: IChangePasswordDTO): Promise<Company> {
    const company = await CompanyModel.findById(id);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    const hashedPassword = await hash(newPassword, 8);
    company.password = hashedPassword;
    await company.save();
    return company;
  }
}

export { ChangeCompanyPasswordService };
