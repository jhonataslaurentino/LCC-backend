import { AxiosInstance } from 'axios';
import createAddContactRequestBody from '../../../../../../api/Bitrix/createAddContactRequestBody';
import AppError from '../../../../../../errors/AppError';

interface IRequest {
  name: string;
  email: string;
  birthday?: Date;
  personType?: string;
  companyID: number;
  cpf?: string;
  cnpj?: string;
  phone?: string;
}

class CreateBitrixContactService {
  constructor(private api: AxiosInstance) {}

  async execute({
    companyID,
    email,
    name,
    cnpj,
    cpf,
    personType,
    phone,
  }: IRequest): Promise<number> {
    const addContactRequestBody = createAddContactRequestBody({
      email,
      name,
      personType,
      cnpj,
      cpf,
      phone,
      companyBitrixID: Number(companyID),
    });
    const response = await this.api.post(
      '/crm.contact.add',
      addContactRequestBody,
    );
    const contactID = response.data.result;
    if (!contactID) {
      throw new AppError('It was not possible to create a contact', 500);
    }
    return contactID;
  }
}

export { CreateBitrixContactService };
