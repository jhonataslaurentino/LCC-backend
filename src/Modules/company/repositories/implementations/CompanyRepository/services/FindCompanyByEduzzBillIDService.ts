import AppError from '../../../../../../errors/AppError';
import { CompanyModel } from '../../../../models/Company';
import Company from '../../../../schemas/Company';

class FindCompanyByEduzzBillIDService {
  async execute(billID: number): Promise<Company> {
    const company = await CompanyModel.findOne({
      eduzzBillID: billID,
    });
    if (!company) {
      throw new AppError('Any Company is using this billID', 400);
    }
    return company;
  }
}

export { FindCompanyByEduzzBillIDService };
