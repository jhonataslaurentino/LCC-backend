import { BitrixContact } from '../schemas/BitrixContact';

interface ICreateBitrixContactData {
  name: string;
  email: string;
  personType?: string;
  companyID: number;
  cpf?: string;
  cnpj?: string;
  phone?: string;
  birthday: Date;
}

interface IListByCompanyID {
  bitrixCompanyID: number;
  page: number;
}

interface IListByCompanyIDResponse {
  result: BitrixContact[];
  total: number;
  next: number;
}

interface IBitrixContactRepository {
  ListByCompanyID({
    bitrixCompanyID,
    page,
  }: IListByCompanyID): Promise<IListByCompanyIDResponse>;
  findByID(id: number): Promise<BitrixContact>;
  create(data: ICreateBitrixContactData): Promise<BitrixContact>;
}

export {
  IBitrixContactRepository,
  ICreateBitrixContactData,
  IListByCompanyID,
  IListByCompanyIDResponse,
};
