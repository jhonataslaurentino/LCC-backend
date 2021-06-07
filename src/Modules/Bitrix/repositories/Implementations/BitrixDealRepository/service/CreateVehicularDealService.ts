import { AxiosInstance } from 'axios';
import { ICreateVehicularDealDTO } from '../../../IBitrixDealRepository';

interface RequestBody {
  [key: string]: string | number;
}

class CreateVehicularDealService {
  constructor(private api: AxiosInstance) {}

  private getFieldsFormatted({
    name,
    contactID,
    companyID,
    opportunityValue,
    vehicularCreditType,
    clientSituation,
    contactMonthlyIncome,
    vehicleName,
    vehicleManufacturedDate,
    vehicleModel,
    vehicleValue,
    vehicleTargetValue,
    address,
  }: ICreateVehicularDealDTO): RequestBody {
    return {
      TITLE: name,
      CONTACT_ID: contactID,
      COMPANY_ID: companyID,
      OPPORTUNITY: opportunityValue,
      UF_CRM_1612805901: vehicularCreditType,
      UF_CRM_1612806099: clientSituation,
      UF_CRM_1612806163: contactMonthlyIncome,
      UF_CRM_1612806216: vehicleName,
      UF_CRM_1612806231: vehicleManufacturedDate,
      UF_CRM_1612806238: vehicleModel,
      UF_CRM_1612806255: vehicleValue,
      UF_CRM_1612806274: vehicleTargetValue,
      UF_CRM_1602612650306: address,
      CATEGORY_ID: 5,
    };
  }

  async execute(data: ICreateVehicularDealDTO): Promise<number> {
    const requestBody = this.getFieldsFormatted(data);
    const response = await this.api.post('crm.deal.add', {
      requestBody,
    });
    const dealID = response.data.result;
    return dealID;
  }
}

export { CreateVehicularDealService };
