import { AxiosInstance } from 'axios';
import { ICreateRealEstateDealDTO } from '../../../IBitrixDealRepository';

interface IRequestBody {
  [key: string]: string | number | Date;
}

class CreateRealEstateDealService {
  constructor(private api: AxiosInstance) {}

  private createRequestBody({
    name,
    companyID,
    contactID,
    opportunityValue,
    address,
    personType,
    propertyValue,
    creditType,
    term,
    phone,
    email,
    propertyID,
  }: ICreateRealEstateDealDTO): IRequestBody {
    return {
      TITLE: `${name}`,
      COMPANY_ID: companyID,
      CONTACT_ID: contactID,
      STAGE_ID: 'C1:NEW',
      CURRENCY_ID: 'BRL',
      OPPORTUNITY: opportunityValue,
      CATEGORY_ID: '1',
      STAGE_SEMANTIC_ID: 'P',
      IS_NEW: 'Y',
      UF_CRM_1602185248: personType,
      UF_CRM_1602185367: address,
      UF_CRM_1602185497: propertyValue,
      UF_CRM_1602185514: opportunityValue,
      UF_CRM_1602185558: term,
      UF_CRM_5F7F69C6D493F: phone,
      UF_CRM_5F7F69C6D9350: email,
      UF_CRM_1602186057: propertyID,
      // UF_CRM_1602186083: propertyType,
      UF_CRM_1602186227: creditType,
    };
  }

  async execute(data: ICreateRealEstateDealDTO): Promise<string> {
    const requestBody = this.createRequestBody(data);
    const response = await this.api.post('/crm.deal.add', {
      fields: requestBody,
    });
    const dealID = response.data.result;
    return dealID;
  }
}

export { CreateRealEstateDealService };
