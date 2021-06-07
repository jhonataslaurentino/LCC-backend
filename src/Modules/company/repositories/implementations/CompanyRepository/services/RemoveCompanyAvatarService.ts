import AppError from '../../../../../../errors/AppError';
import { CompanyModel } from '../../../../models/Company';
import Company from '../../../../schemas/Company';

class RemoveCompanyAvatarService {
  async execute(id: string): Promise<Company> {
    const company = await CompanyModel.findById(id);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    company.avatarBitrixFileID = null;
    await company.save();
    return company;
  }
}

export { RemoveCompanyAvatarService };
