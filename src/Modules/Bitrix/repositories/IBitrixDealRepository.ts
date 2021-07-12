import { BitrixDeal } from '../schemas/BitrixDeal';
import BitrixDealField from '../schemas/BitrixDealField';

interface IFindByCompanyIDDTO {
  page: number;
  companyID: string;
  category_id: string;
}

interface IListDealsResponse {
  result: BitrixDeal[];
  total: number;
  next: number;
}

interface IUpdateDealDTO {
  id: string;
  [field: string]: string | number;
}

interface ICreateVehicularDealDTO {
  name: string;
  contactID: string;
  companyID: string;
  opportunityValue: number;
  vehicularCreditType: string;
  clientSituation: string;
  contactMonthlyIncome: number;
  vehicleName: string;
  vehicleManufacturedDate: string;
  vehicleModel: string;
  vehicleValue: number;
  vehicleTargetValue: number;
  address: string;
}

interface ICreateRealEstateDealDTO {
  name: string;
  companyID: string;
  contactID: string;
  opportunityValue: number;
  term: number;
  phone: string;
  email: string;
  // propertyType: string;
  propertyValue: number;
  personType: string;
  address: string;
  creditType: string;
  propertyID: string;
}

interface ICreatePersonalDealDTO {
  opportunityValue: number;
  contactID: string;
  companyID: string;
  cpf: string;
  birthday: Date;
  typeOfContract: '612' | '614';
  CNH: Express.Multer.File;
  proofOfAddress: Express.Multer.File;
}

interface IGenericObjectDTO {
  [key: string]: string | string[] | number | number[] | Date | Date[];
}

interface IListDealsDTO {
  page: number;
  categoryID: number | number[];
  filter?: IGenericObjectDTO;
  companyID: number | number[];
}

interface IBitrixDealRepository {
  findByCompanyID({
    companyID,
    page,
    category_id,
  }: IFindByCompanyIDDTO): Promise<IListDealsResponse>;
  UpdateDealField(data: IUpdateDealDTO): Promise<BitrixDeal>;
  findByID(id: string): Promise<BitrixDeal>;
  listFields(): Promise<BitrixDealField[]>;
  CreateVehicularDeal(data: ICreateVehicularDealDTO): Promise<BitrixDeal>;
  CreateRealEstateDeal(data: ICreateRealEstateDealDTO): Promise<BitrixDeal>;
  CreatePersonalDeal(data: ICreatePersonalDealDTO): Promise<BitrixDeal>;
  list(data: IListDealsDTO): Promise<IListDealsResponse>;
}

export {
  IBitrixDealRepository,
  IFindByCompanyIDDTO,
  ICreateVehicularDealDTO,
  ICreateRealEstateDealDTO,
  IListDealsResponse,
  IUpdateDealDTO,
  IListDealsDTO,
  ICreatePersonalDealDTO,
};
