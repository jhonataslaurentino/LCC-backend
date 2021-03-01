import CompanyModel from "../Entities/Company";

export interface Request {
  contactID: number;
  companyID: string;
  opportunityValue: number;
  vehicularCreditType: string;
  clientSituation: string;
  monthlyIncome: number;
  vehicleName: string;
  vehicleManufacturedDate: Date;
  vehicleModel: string;
  vehicleValue: number;
  vehicleTargetValue: number;
}

class CreateVehicleDealService {
  public async execute({
    contactID,
    companyID,
    opportunityValue,
    vehicularCreditType,
    clientSituation,
    monthlyIncome,
    vehicleName,
    vehicleManufacturedDate,
    vehicleModel,
    vehicleTargetValue,
    vehicleValue,
  }: Request): Promise<number> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }

    const addVehicleDealRequestBody =
  }
}
