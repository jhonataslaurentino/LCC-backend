import { BitrixCompany } from '../schemas/BitrixCompany';

interface ICreateBitrixCompanyDTO {
  name: string;
  phone: string;
  email: string;
  cpf_cnpj: string;
}

interface IBitrixCompanyRepository {
  findByEmail(email: string): Promise<BitrixCompany>;
  createBitrixCompany(data: ICreateBitrixCompanyDTO): Promise<number>;
}

export { IBitrixCompanyRepository, ICreateBitrixCompanyDTO };
