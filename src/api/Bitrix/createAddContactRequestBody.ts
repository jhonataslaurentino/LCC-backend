interface ICreateAddContactRequestBody {
  companyBitrixID: number;
  name: string;
  phone?: string;
  email: string;
  personType: string;
  cpf?: string;
  cnpj?: string;
  birthday: Date;
}

const createAddContactRequestBody = ({
  name,
  phone,
  email,
  personType,
  cpf,
  cnpj,
  companyBitrixID,
  birthday,
}: // eslint-disable-next-line @typescript-eslint/ban-types
ICreateAddContactRequestBody): Object => {
  return {
    fields: {
      BIRTHDATE: birthday,
      COMPANY_ID: companyBitrixID,
      NAME: name,
      PHONE: [
        {
          VALUE: phone,
          VALUE_TYPE: 'WORK',
        },
      ],
      EMAIL: [
        {
          VALUE: email,
          VALUE_TYPE: 'WORK',
        },
      ],
      UF_CRM_1607694733: personType === 'PF' ? '147' : '149',
      UF_CRM_1602185690: cpf,
      UF_CRM_1607694757: cnpj,
      UF_CRM_1602185703: cpf,
    },
  };
};

export default createAddContactRequestBody;
