import { CompanyModel } from '../../company/models/Company';
import Company from '../../company/schemas/Company';

interface Request {
  eduzzBillID: number;
}

class RemoveCompanyRefundedService {
  public async execute({ eduzzBillID }: Request): Promise<Company> {
    const company = await CompanyModel.findOneAndDelete({
      eduzzBillID,
    });
    return company;
  }
}

export default RemoveCompanyRefundedService;
