import { AxiosInstance } from 'axios';
import qs from 'qs';
import { BitrixContact } from '../../../../schemas/BitrixContact';

class GetBitrixContactService {
  constructor(private api: AxiosInstance) {}

  async execute(contactID: number): Promise<BitrixContact | null> {
    try {
      const response = await this.api.get('/crm.contact.get', {
        params: {
          id: contactID,
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        },
      });
      return response.data.result as BitrixContact;
    } catch (error) {
      return null;
    }
  }
}

export { GetBitrixContactService };
