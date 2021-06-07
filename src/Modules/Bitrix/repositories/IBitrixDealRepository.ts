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
  contactID: number;
  companyID: string;
  opportunityValue: number;
  vehicularCreditType: 'Refin' | 'Aquisição';
  clientSituation:
    | 'Assalariado'
    | 'Empresário'
    | 'Funcionário Público'
    | 'Aposentado'
    | 'Autônomo';
  contactMonthlyIncome: number;
  vehicleName: string;
  vehicleManufacturedDate: string;
  vehicleModel: string;
  vehicleValue: number;
  vehicleTargetValue: number;
  address: string;
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
}

export {
  IBitrixDealRepository,
  IFindByCompanyIDDTO,
  ICreateVehicularDealDTO,
  IFindByCompanyIDResponse,
  IUpdateDealDTO,
};
