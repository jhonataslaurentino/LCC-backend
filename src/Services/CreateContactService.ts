import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';
import createAddContactRequestBody from '../api/Bitrix/createAddContactRequestBody';
import { CompanyModel } from '../Modules/company/models/Company';

interface Request {
  name: string;
  email: string;
  birthday?: Date;
  personType?: string;
  companyID: string;
  cpf?: string;
  cnpj?: string;
  phone?: string;
}

class CreateContactService {
  public async execute({
    name,
    email,
    personType,
    cpf,
    cnpj,
    phone,
    companyID,
  }: Request): Promise<number> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }

    const addContactRequestBody = createAddContactRequestBody({
      email,
      name,
      personType,
      cnpj,
      cpf,
      phone,
      companyBitrixID: company.bitrix_id,
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

export default CreateContactService;
