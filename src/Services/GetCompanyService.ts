import { Document } from 'mongoose';
import Company, { ICompany } from '../Model/Company';

interface Request {
  id: string;
}

class GetCompanyService {
  public async execute({ id }: Request): Promise<Document<ICompany>> {
    const company: ICompany | null = await Company.findById(id);
    if (!company) {
      throw new Error('Company does not exists');
    }
    return company;
  }
}

export default GetCompanyService;
