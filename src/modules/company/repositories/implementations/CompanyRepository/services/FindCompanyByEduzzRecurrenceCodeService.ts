import AppError from '../../../../../../errors/AppError';
import { CompanyModel } from '../../../../models/Company';
import Company from '../../../../schemas/Company';

class FindCompanyByEduzzRecurrenceCodeService {
  async execute(recurrenceCode: number): Promise<Company> {
    const company = await CompanyModel.findOne({
      eduzzRecurrenceCode: recurrenceCode,
    });
    if (!company) {
      throw new AppError('Company not found', 404);
    }
    return company;
  }
}

export { FindCompanyByEduzzRecurrenceCodeService };
