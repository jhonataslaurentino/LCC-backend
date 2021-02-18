import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';
import createAddContactRequestBody from '../api/Bitrix/createAddContactRequestBody';

interface Request {
  name: string;
  email: string;
  personType: string;
  cpf?: string;
  cnpj?: string;
  phone?: string;
}

class AddContactService {
  public async execute({
    name,
    email,
    personType,
    cpf,
    cnpj,
    phone,
  }: Request): Promise<number> {
    const addContactRequestBody = createAddContactRequestBody({
      email,
      name,
      personType,
      cnpj,
      cpf,
      phone,
    });
    const response = await bitrixApi.post(
      `${bitrixApiMethods.ADD_CONTACT}.json`,
      addContactRequestBody,
    );

    const contactID = response.data.result;
    if (!contactID) {
      throw new Error('it was not possible to create a contact');
    }

    return contactID;
  }
}

export default AddContactService;
