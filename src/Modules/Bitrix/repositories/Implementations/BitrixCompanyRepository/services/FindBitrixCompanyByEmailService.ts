import { AxiosInstance } from 'axios';
import qs from 'qs';
import { BitrixCompany } from '../../../../models/BitrixCompany';

class FindBitrixCompanyByEmailService {
  constructor(private api: AxiosInstance) {}

  async execute(email: string): Promise<BitrixCompany> {
    const response = await this.api.get('/crm.company.list', {
      params: {
        filter: { '=EMAIL': email },
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
    const { result } = response.data;
    if (result.length === 0) {
      return null;
    }
    return result[0];
  }
}

export { FindBitrixCompanyByEmailService };
