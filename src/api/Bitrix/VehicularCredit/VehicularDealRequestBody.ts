import { Request } from '../../../Services/CreateVehicularDealService';

interface VehicularDealRequestBodyProperties
  extends Omit<Request, 'companyID'> {
  companyID: number;
}

class VehicularDealRequestBody {
  // eslint-disable-next-line no-useless-constructor
  constructor(private properties: VehicularDealRequestBodyProperties) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  public getRequestBody(): Object {
    return {
      fields: {
        TITLE: this.properties.name,
        CONTACT_ID: this.properties.contactID,
        COMPANY_ID: this.properties.companyID,
        OPPORTUNITY: this.properties.vehicleTargetValue,
        UF_CRM_1612805901: this.getCreditTypeID(),
        UF_CRM_1612806099: this.getClientSituationID(),
        UF_CRM_1612806163: this.properties.contactMonthlyIncome,
        UF_CRM_1612806216: this.properties.vehicleName,
        UF_CRM_1612806231: this.properties.vehicleManufacturedDate,
        UF_CRM_1612806238: this.properties.vehicleModel,
        UF_CRM_1612806255: this.properties.vehicleValue,
        UF_CRM_1612806274: this.properties.vehicleTargetValue,
        CATEGORY_ID: '5',
      },
    };
  }

  private getClientSituationID(): number {
    switch (this.properties.clientSituation) {
      case 'Assalariado':
        return 171;

      case 'Empresário':
        return 173;

      case 'Funcionário Público':
        return 175;

      case 'Aposentado':
        return 177;

      case 'Autônomo':
        return 179;

      default:
        return 179;
    }
  }

  private getCreditTypeID(): number {
    switch (this.properties.vehicularCreditType) {
      case 'Aquisição':
        return 167;
      case 'Refin':
        return 169;
      default:
        return 167;
    }
  }
}

export default VehicularDealRequestBody;
