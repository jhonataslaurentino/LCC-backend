import { BitrixDeal } from '../schemas/BitrixDeal';
import BitrixDealField from '../schemas/BitrixDealField';

interface IFindByCompanyIDDTO {
  page: number;
  companyID: string;
  category_id: string;
}

interface IFindByCompanyIDResponse {
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

interface IBitrixDealRepository {
  findByCompanyID({
    companyID,
    page,
    category_id,
  }: IFindByCompanyIDDTO): Promise<IFindByCompanyIDResponse>;
  UpdateDealField(data: IUpdateDealDTO): Promise<BitrixDeal>;
  findByID(id: string): Promise<BitrixDeal>;
  listFields(): Promise<BitrixDealField[]>;
  CreateVehicularDeal(data: ICreateVehicularDealDTO): Promise<BitrixDeal>;
  CreateRealEstateDeal(data: ICreateRealEstateDealDTO): Promise<BitrixDeal>;
}

export {
  IBitrixDealRepository,
  IFindByCompanyIDDTO,
  ICreateVehicularDealDTO,
  ICreateRealEstateDealDTO,
  IFindByCompanyIDResponse,
  IUpdateDealDTO,
};
