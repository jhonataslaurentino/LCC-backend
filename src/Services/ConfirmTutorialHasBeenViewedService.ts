import { CompanyModel } from '../Modules/company/models/Company';
import Company from '../Modules/company/schemas/Company';

interface Request {
  companyID: string;
}

class ConfirmTutorialHasBeenViewedService {
  public async execute({ companyID }: Request): Promise<Company> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }
    company.sawTutorial = true;
    await company.save();
    return company;
  }
}

export default ConfirmTutorialHasBeenViewedService;
