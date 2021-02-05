import { Document } from 'mongoose';
import bitrixApi, { bitrixApiMethods } from '../api/bitrix';
import Company, { ICompany } from '../Model/Company';

interface Request {
  name: string;
  personName: string;
  email: string;
  phone: string;
  password: string;
  cpf_cnpj: string;
}

class CreateCompanyService {
  public async execute({
    name,
    personName,
    email,
    phone,
    password,
    cpf_cnpj,
  }: Request): Promise<Document<ICompany>> {
    const requestBody = {
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
      },
    };
    const response = await bitrixApi.post(
      `${bitrixApiMethods.ADD_COMPANY}.json`,
      requestBody,
    );

    const { ID: companyBitrixId } = response.data;

    const company: ICompany = await Company.create({
      name,
      personName,
      password,
      bitrix_id: Number(companyBitrixId),
      cpf_cnpj,
    });

    return company;
  }
}

export default CreateCompanyService;
