import Company from '../schemas/Company';

interface ICompanyRepository {
  findByID(id: string): Promise<Company>;
  removeAvatar(id: string): Promise<Company>;
}

export { ICompanyRepository };
