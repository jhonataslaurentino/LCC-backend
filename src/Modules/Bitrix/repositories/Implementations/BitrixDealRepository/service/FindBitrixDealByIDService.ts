import { AxiosInstance } from 'axios';
import { BitrixDeal } from '../../../../schemas/BitrixDeal';

class FindBitrixDealByIDService {
  constructor(private api: AxiosInstance) {}

  async execute(id: string): Promise<BitrixDeal> {
    const response = await this.api.get('/crm.deal.get', {
      params: {
        id,
      },
    });
    const bitrixDeal = response.data.result;
    return bitrixDeal;
  }
}

export { FindBitrixDealByIDService };
