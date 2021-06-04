import { compare } from 'bcryptjs';
import { CompanyModel } from '../Modules/company/models/Company';
import Company from '../Modules/company/schemas/Company';
import UpdateProfileAtBitrixService from './UpdateProfileAtBitrixService';

interface Request {
  companyID: string;
  name: string;
  personName: string;
  phone: string;
  password: string;
}

class UpdateProfileService {
  public async execute({
    companyID,
    name,
    personName,
    phone,
    password,
  }: Request): Promise<Company> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }
    const isPasswordMatched = await compare(password, company.password);
    if (!isPasswordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const updateProfileAtBitrixService = new UpdateProfileAtBitrixService();
    await updateProfileAtBitrixService.execute({
      bitrix_id: company.bitrix_id,
      name,
      phone,
    });

    company.name = name;
    company.personName = personName;
    company.phone = phone;

    await company.save();
    return company;
  }
}

export default UpdateProfileService;
