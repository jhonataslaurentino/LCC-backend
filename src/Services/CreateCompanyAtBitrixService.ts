import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';
import createAddCompanyRequestBody from '../api/Bitrix/createAddCompanyRequestBody';

interface Request {
  title: string;
  phone: string;
  email: string;
}

class CreateCompanyAtBitrixService {
  public async execute({ title, phone, email }: Request): Promise<number> {
    if (
      email === 'gledson.leytte@hotmail.com' ||
      email === 'gledson.leytte@gmail.com'
    ) {
      return 129;
    }

    const addCompanyRequestBody = createAddCompanyRequestBody({
      title,
      phone,
      email,
    });
    const response = await bitrixApi.post(
      `${bitrixApiMethods.ADD_COMPANY}.JSON`,
      addCompanyRequestBody,
    );

    if (!response.data.result) {
      throw new Error('It does not possible create a company at bitrix');
    }

    const companyID = response.data.result;
    return companyID;
  }
}

export default CreateCompanyAtBitrixService;
