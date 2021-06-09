import AppError from '../../../../../../errors/AppError';
import { CompanyModel } from '../../../../models/Company';
import Company from '../../../../schemas/Company';
import { IUpdateCompanyTokenDTO } from '../../../ICompanyRepository';

class UpdateCompanyTokenService {
  async execute({ id, token }: IUpdateCompanyTokenDTO): Promise<Company> {
    const company = await CompanyModel.findById(id);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    company.accessToken = token;
    await company.save();
    return company;
  }
}

export { UpdateCompanyTokenService };
