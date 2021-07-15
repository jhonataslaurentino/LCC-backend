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

interface ICreateExchangeDealForPhysicalPersonDTO {
  contactID: string;
  companyID: string;
  opportunityValue: number;
  name: string;
  cpf: string;
  interestComment: string;
  birthday: Date;
  monthlyIncome: number;
  rg: string;
  rgIssueDate: Date;
  rgIssuingAgency: string;
  naturalness: string;
  nationality: string;
  gender: string;
  profession: string;
  homeAddress: string;
  district: string;
  city: string;
  UF: string;
  zipCode: string;
  maritalStatus: string;
  phone: string;
  cellPhone: string;
  doesTheCustomerHaveAnyRelevantRole: string;
}

interface ICreateExchangeDealForLegalPersonDTO {
  addressNumber: string;
  contactID: string;
  companyID: string;
  complement: string;
  district: string;
  opportunityValue: number;
  corporateName: string;
  fantasyName: string;
  companyAddress: string;
  phone: string;
  mainActivity: string;
  cnpj: string;
  city: string;
  uf: string;
  email: string;
}

interface ICreateConsignedDealDTO {
  opportunityValue: number;
  contactID: string;
  companyID: string;
  cpf: string;
  contractedBody: string;
  bankBranch: string;
  bankAccount: string;
  bankFinancialInstitution: string;
  CNH: Express.Multer.File;
  proofOfAddress: Express.Multer.File;
}

interface ICreatePrepaymentOfReceivablesDTO {
  contactID: string;
  companyID: string;
  opportunityValue: number;
  associateCPF: Express.Multer.File;
  associateRG: Express.Multer.File;
  proofOfAddress: Express.Multer.File;
  proofOfBusinessAddress: Express.Multer.File;
  socialContract: Express.Multer.File;
  annualInvoice: number;
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
  CreateConsignedDeal(data: ICreateConsignedDealDTO): Promise<BitrixDeal>;
  CreateExchangeDealForPhysicalPerson(
    data: ICreateExchangeDealForPhysicalPersonDTO,
  ): Promise<BitrixDeal>;
  CreateExchangeDealForLegalPerson(
    data: ICreateExchangeDealForLegalPersonDTO,
  ): Promise<BitrixDeal>;
  CreatePrepaymentOfReceivablesDeal(
    data: ICreatePrepaymentOfReceivablesDTO,
  ): Promise<BitrixDeal>;
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
  ICreateExchangeDealForLegalPersonDTO,
  ICreateExchangeDealForPhysicalPersonDTO,
  ICreateConsignedDealDTO,
  ICreatePrepaymentOfReceivablesDTO,
};
