import CompanyModel from '../Entities/Company';

interface Request {
  companyID: string;
}

class VerifyIfCompanySawTutorialService {
  public async execute({ companyID }: Request): Promise<boolean> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }
    return !!company.sawTutorial;
  }
}

export default VerifyIfCompanySawTutorialService;
