import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';
import createUpdateCompanyRequestBody from '../api/Bitrix/createUpdateCompanyRequestBody';

interface Request {
  name: string;
  phone: string;
  bitrix_id: number;
}

class UpdateProfileAtBitrixService {
  public async execute({ name, phone, bitrix_id }: Request): Promise<void> {
    const updateCompanyRequestBody = createUpdateCompanyRequestBody({
      bitrix_id,
      phone,
      name,
    });

    const response = await bitrixApi.post(
      `${bitrixApiMethods.UPDATE_COMPANY}.JSON`,
      updateCompanyRequestBody,
    );
    if (!response.data.result) {
      throw new Error('It does not possible update data at bitrix api');
    }
  }
}

export default UpdateProfileAtBitrixService;
