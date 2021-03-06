import { CompanyModel } from '../modules/company/models/Company';
import Company from '../modules/company/schemas/Company';

interface Request {
  company_id: string;
  bitrix_id: number;
}

class UpdateBitrixIdService {
  public async execute({ company_id, bitrix_id }: Request): Promise<Company> {
    const company = await CompanyModel.findById(company_id).exec();
    if (!company) {
      throw new Error('Company not found');
    }
    company.bitrix_id = bitrix_id;
    await company.save();
    return company;
  }
}

export default UpdateBitrixIdService;
