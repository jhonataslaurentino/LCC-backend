import { BitrixCompany } from '../schemas/BitrixCompany';

interface ICreateBitrixCompanyDTO {
  name: string;
  phone: string;
  email: string;
  cpf_cnpj: string;
  [field: string]: string | number | Date;
}

interface IUpdateCompanyDTO {
  id: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  [field: string]: string | number | Date | Object;
}

interface IBitrixCompanyRepository {
  findByEmail(email: string): Promise<BitrixCompany>;
  createBitrixCompany(data: ICreateBitrixCompanyDTO): Promise<number>;
  updateField(data: IUpdateCompanyDTO): Promise<BitrixCompany>;
  findById(id: string): Promise<BitrixCompany>;
}

export { IBitrixCompanyRepository, ICreateBitrixCompanyDTO, IUpdateCompanyDTO };
