import { AxiosInstance } from 'axios';
import AppError from '../../../../../../errors/AppError';
import { ICreateBitrixCompanyDTO } from '../../../IBitrixCompanyRepository';

class CreateBitrixCompanyService {
  constructor(private api: AxiosInstance) {}

  async execute({
    email,
    name,
    phone,
    cpf_cnpj,
    ...anotherFields
  }: ICreateBitrixCompanyDTO): Promise<number> {
    const response = await this.api.post('/crm.company.add', {
      fields: {
        TITLE: name,
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
        UF_CRM_1602185703: cpf_cnpj,
        ...anotherFields,
      },
    });
    const { result } = response.data;
    if (!result) {
      throw new AppError('It does not possible to create a company at bitrix');
    }
    const companyID = result;
    return companyID;
  }
}
export { CreateBitrixCompanyService };
