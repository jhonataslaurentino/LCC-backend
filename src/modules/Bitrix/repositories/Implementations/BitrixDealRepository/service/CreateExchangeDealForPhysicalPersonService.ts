import { AxiosInstance } from 'axios';
import { ICreateExchangeDealForPhysicalPersonDTO } from '../../../IBitrixDealRepository';

class CreateExchangeDealForPhysicalPersonService {
  constructor(private api: AxiosInstance) {}

  async execute({
    UF,
    birthday,
    cellPhone,
    city,
    interestComment,
    companyID,
    contactID,
    cpf,
    district,
    doesTheCustomerHaveAnyRelevantRole,
    gender,
    homeAddress,
    phone,
    maritalStatus,
    monthlyIncome,
    name,
    nationality,
    naturalness,
    opportunityValue,
    profession,
    rg,
    rgIssueDate,
    rgIssuingAgency,
    zipCode,
  }: ICreateExchangeDealForPhysicalPersonDTO): Promise<string> {
    const response = await this.api.post('/crm.deal.add', {
      fields: {
        CATEGORY_ID: '11',
        OPPORTUNITY: opportunityValue,
        CONTACT_ID: contactID,
        COMPANY_ID: companyID,
        UF_CRM_1623936235: UF,
        UF_CRM_1617996868133: birthday,
        UF_CRM_1623936418: cellPhone,
        UF_CRM_1623936186: city,
        COMMENTS: interestComment,
        UF_CRM_1617996849572: cpf,
        UF_CRM_1623936175: district,
        UF_CRM_1623937122: doesTheCustomerHaveAnyRelevantRole,
        UF_CRM_1623936080: gender,
        UF_CRM_1623936162: homeAddress,
        UF_CRM_1623936410: phone,
        UF_CRM_1623936321: maritalStatus,
        UF_CRM_1612806163: monthlyIncome,
        UF_CRM_1617996840133: name,
        UF_CRM_1617996878001: nationality,
        UF_CRM_1617996884042: naturalness,
        UF_CRM_1623936130: profession,
        UF_CRM_1617996854120: rg,
        UF_CRM_1623936014: rgIssueDate,
        UF_CRM_1623936043: rgIssuingAgency,
        UF_CRM_162393625: zipCode,
      },
    });
    const dealID = response.data.result;
    return dealID;
  }
}

export { CreateExchangeDealForPhysicalPersonService };
