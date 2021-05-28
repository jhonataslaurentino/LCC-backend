import CompanyModel from '../../Entities/Company';
import Company from '../../Schemas/Company';

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
