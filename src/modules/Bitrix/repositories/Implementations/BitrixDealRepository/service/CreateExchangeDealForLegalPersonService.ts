import { AxiosInstance } from 'axios';
import { ICreateExchangeDealForLegalPersonDTO } from '../../../IBitrixDealRepository';

class CreateExchangeDealForLegalPersonService {
  constructor(private api: AxiosInstance) {}

  async execute({
    addressNumber,
    city,
    cnpj,
    companyAddress,
    companyID,
    complement,
    contactID,
    corporateName,
    district,
    fantasyName,
    mainActivity,
    opportunityValue,
    phone,
    uf,
    email,
  }: ICreateExchangeDealForLegalPersonDTO): Promise<string> {
    const response = await this.api.post('/crm.deal.add', {
      fields: {
        CATEGORY_ID: '11',
        OPPORTUNITY: opportunityValue,
        CONTACT_ID: contactID,
        COMPANY_ID: companyID,
        UF_CRM_1623936840: corporateName,
        UF_CRM_1623936849: fantasyName,
        UF_CRM_1623936865: cnpj,
        UF_CRM_1623936942: companyAddress,
        UF_CRM_1623936959: addressNumber,
        UF_CRM_1623936970: complement,
        UF_CRM_1623936978: district,
        UF_CRM_1623936987: city,
        UF_CRM_1623937288: uf,
        UF_CRM_5F7F69C6D493F: phone,
        UF_CRM_5F7F69C6D9350: email,
        UF_CRM_1623937048: mainActivity,
      },
    });
    const dealID = response.data.result;
    return dealID;
  }
}

export { CreateExchangeDealForLegalPersonService };
