import BasicCompanyModel from '../Entities/BasicCompany';
import { CompanyModel } from '../modules/company/models/Company';
import BasicCompany from '../Schemas/BasicCompany';

interface Request {
  name: string;
  email: string;
  phone: string;
}

class CreateBasicCompanyService {
  public async execute({ name, email, phone }: Request): Promise<BasicCompany> {
    const isThereAnyCompanyWithSameEmail = await CompanyModel.findOne({
      email,
    }).exec();

    if (isThereAnyCompanyWithSameEmail) {
      throw new Error('This email is already used');
    }

    const isThereAnyBasicCompanyWithSameEmail = await BasicCompanyModel.findOne(
      {
        email,
      },
    ).exec();

    if (isThereAnyBasicCompanyWithSameEmail) {
      throw new Error('This email is already used');
    }

    const basicCompany = await BasicCompanyModel.create({
      name,
      email,
      phone,
    });

    return basicCompany;
  }
}

export default CreateBasicCompanyService;
