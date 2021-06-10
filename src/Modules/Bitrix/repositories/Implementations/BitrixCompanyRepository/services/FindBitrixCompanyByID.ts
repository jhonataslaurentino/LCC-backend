import { AxiosInstance } from 'axios';
import { BitrixCompany } from '../../../../schemas/BitrixCompany';

class FindBitrixCompanyByID {
  constructor(private api: AxiosInstance) {}

  async execute(id: string): Promise<BitrixCompany> {
    const response = await this.api.get('/crm.company.get', {
      params: {
        id,
      },
    });
    const bitrixCompany = response.data.result;
    return bitrixCompany;
  }
}

export { FindBitrixCompanyByID };
