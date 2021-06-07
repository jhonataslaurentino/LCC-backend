import Company from '../../../schemas/Company';
import { ICompanyRepository } from '../../ICompanyRepository';
import { FindCompanyByIDService } from './services/FindCompanyByIDService';

class CompanyRepository implements ICompanyRepository {
  private static INSTANCE: CompanyRepository;

  public static getInstance(): CompanyRepository {
    if (!CompanyRepository.INSTANCE) {
      CompanyRepository.INSTANCE = new CompanyRepository();
    }
    return CompanyRepository.INSTANCE;
  }

  async findByID(id: string): Promise<Company> {
    const findCompanyByIDService = new FindCompanyByIDService();
    const company = await findCompanyByIDService.execute(id);
    return company;
  }

  async removeAvatar(id: string): Promise<Company> {
    throw new Error('Method not implemented.');
  }
}

export { CompanyRepository };
