import { AxiosInstance } from 'axios';
import qs from 'qs';
import { BitrixContact } from '../../../../models/BitrixContact';

class GetBitrixContactService {
  constructor(private api: AxiosInstance) {}

  async execute(contactID: number): Promise<BitrixContact> {
    const response = await this.api.get('/crm.contact.get', {
      params: {
        id: contactID,
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
    return response.data;
  }
}

export { GetBitrixContactService };
