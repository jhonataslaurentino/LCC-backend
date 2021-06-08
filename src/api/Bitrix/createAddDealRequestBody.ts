interface ICreateAddDealRequestBody {
  name: string;
  companyID: number;
  contactID: number;
  opportunityValue: number;
  term: number;
  phone: string;
  email: string;
  propertyType: string;
  propertyValue: number;
  propertyID: string;
  personType: string;
  address: string;
  creditType: string;
}

const createAddDealRequestBody = ({
  name,
  companyID,
  contactID,
  opportunityValue,
  term,
  phone,
  email,
  propertyType,
  propertyValue,
  propertyID,
  personType,
  address,
  creditType,
}: // eslint-disable-next-line @typescript-eslint/ban-types
ICreateAddDealRequestBody): Object => {
  return {
    fields: {
      TITLE: `${name}`,
      COMPANY_ID: companyID,
      CONTACT_ID: contactID,
      STAGE_ID: 'C1:NEW',
      CURRENCY_ID: 'BRL',
      OPPORTUNITY: opportunityValue,
      CATEGORY_ID: '1',
      STAGE_SEMANTIC_ID: 'P',
      IS_NEW: 'Y',
      UF_CRM_1602185248: personType === 'PF' ? '45' : '47',
      UF_CRM_1602185367: address,
      UF_CRM_1602185497: propertyValue,
      UF_CRM_1602185514: opportunityValue,
      UF_CRM_1602185558: term,
      UF_CRM_5F7F69C6D493F: phone,
      UF_CRM_5F7F69C6D9350: email,
      UF_CRM_1602186057: propertyID,
      UF_CRM_1602186083: propertyType,
      UF_CRM_1602186227: creditType,
    },
  };
};

export default createAddDealRequestBody;
