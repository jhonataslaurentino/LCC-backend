import { AxiosInstance } from 'axios';
import BitrixDealCategory from '../../../../schemas/BitrixDealCategory';

export interface IBitrixApiResponse {
  result: BitrixDealCategory[];
  total: number;
}

class GetBitrixDealsCategoriesService {
  constructor(private api: AxiosInstance) {}

  async execute(): Promise<BitrixDealCategory[]> {
    const response = await this.api.get('/crm.dealcategory.list');
    const { result } = response.data as IBitrixApiResponse;
    return result;
  }
}

export { GetBitrixDealsCategoriesService };
