import CompanyModel from '../Entities/Company';
import Company from '../Schemas/Company';

interface Request {
  company_id: string;
  bitrix_id: number;
}

class UpdateBitrixIdService {
  public async execute({ company_id, bitrix_id }: Request): Promise<Company> {
    const company = await CompanyModel.findById(company_id);
    if (!company) {
      throw new Error('Company not found');
    }
    company.bitrix_id = bitrix_id;
    await company.save();
    return company;
  }
}

export default UpdateBitrixIdService;
