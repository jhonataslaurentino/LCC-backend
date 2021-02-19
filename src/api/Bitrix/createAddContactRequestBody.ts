interface ICreateAddContactRequestBody {
  companyBitrixID: number;
  name: string;
  phone?: string;
  email: string;
  personType: string;
  cpf?: string;
  cnpj?: string;
}

const createAddContactRequestBody = ({
  name,
  phone,
  email,
  personType,
  cpf,
  cnpj,
  companyBitrixID,
}: // eslint-disable-next-line @typescript-eslint/ban-types
ICreateAddContactRequestBody): Object => {
  return {
    fields: {
      COMPANY_ID: companyBitrixID,
      NAME: name,
      PHONE: [
        {
          VALUE_TYPE: 'WORK',
          VALUE: phone,
        },
      ],
      EMAIL: [
        {
          VALUE_TYPE: 'WORK',
          VALUE: email,
        },
      ],
      UF_CRM_1607694733: personType === 'PF' ? '147' : '149',
      UF_CRM_1602185690: cpf,
      UF_CRM_1607694757: cnpj,
    },
  };
};

export default createAddContactRequestBody;
