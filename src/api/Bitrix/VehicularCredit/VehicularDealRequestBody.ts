class VehicularDealRequestBody {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private contactID: number,
    private companyID: number,
    private OpportunityValue: number,
    private vehicularCreditType: 'Refin' | 'Aquisição',
    private clientSituation:
      | 'Assalariado'
      | 'Empresário'
      | 'Funcionário Público'
      | 'Aposentado'
      | 'Autônomo',
    private contactMonthlyIncome: number,
    private vehicleName: string,
    private vehicleManufacturedDate: Date,
    private vehicleModel: string,
    private vehicleValue: number,
    private vehicleTargetValue: number,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  public getRequestBody(): Object {
    return {
      fields: {
        CONTACT_ID: this.contactID,
        COMPANY_ID: this.companyID,
        OPPORTUNITY: this.OpportunityValue,
        UF_CRM_1612805901: this.getCreditTypeID(),
        UF_CRM_1612806099: this.getClientSituationID(),
        UF_CRM_1612806163: this.contactMonthlyIncome,
        UF_CRM_1612806216: this.vehicleName,
        UF_CRM_1612806231: this.vehicleManufacturedDate,
        UF_CRM_1612806238: this.vehicleModel,
        UF_CRM_1612806255: this.vehicleValue,
        UF_CRM_1612806274: this.vehicleTargetValue,
      },
    };
  }

  private getClientSituationID(): number {
    switch (this.clientSituation) {
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
    switch (this.vehicularCreditType) {
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
