interface ICreateAddCompanyRequestBody {
  title: string;
  phone: string;
  email: string;
}

const createAddCompanyRequestBody = ({
  title,
  phone,
  email,
}: // eslint-disable-next-line @typescript-eslint/ban-types
ICreateAddCompanyRequestBody): Object => ({
  fields: {
    TITLE: title,
    COMPANY_TYPE: 'CUSTOMER',
    CURRENCY_ID: 'BRL',
    OPENED: 'Y',
    PHONE: [phone],
    EMAIL: [
      {
        VALUE_TYPE: 'WORK',
        VALUE: email,
      },
    ],
  },
});

export default createAddCompanyRequestBody;
