import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';
import VehicularDealRequestBody from '../api/Bitrix/VehicularCredit/VehicularDealRequestBody';
import CompanyModel from '../Entities/Company';

export interface Request {
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
  vehicleManufacturedDate: Date;
  vehicleModel: string;
  vehicleValue: number;
  vehicleTargetValue: number;
  address: string;
}

class CreateVehicleDealService {
  public async execute({
    contactID,
    companyID,
    opportunityValue,
    vehicularCreditType,
    clientSituation,
    contactMonthlyIncome,
    vehicleName,
    vehicleManufacturedDate,
    vehicleModel,
    vehicleTargetValue,
    vehicleValue,
    name,
    address,
  }: Request): Promise<number> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }

    const vehicleDealRequestBody = new VehicularDealRequestBody({
      name,
      contactID,
      companyID: company.bitrix_id,
      opportunityValue,
      vehicularCreditType,
      clientSituation,
      contactMonthlyIncome,
      vehicleName,
      vehicleManufacturedDate,
      vehicleModel,
      vehicleTargetValue,
      vehicleValue,
      address,
    });
    const requestBody = vehicleDealRequestBody.getRequestBody();
    const response = await bitrixApi.post(
      `${bitrixApiMethods.ADD_DEAL}.json`,
      requestBody,
    );
    const dealID = response.data.result;
    if (!dealID) {
      throw new Error('It was not possible to create a deal');
    }
    return dealID;
  }
}

export default CreateVehicleDealService;
