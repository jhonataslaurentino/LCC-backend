import { AxiosInstance } from 'axios';
import qs from 'qs';
import BitrixDealCategory from '../../../../schemas/BitrixDealCategory';

class GetBitrixDealCategoryByIDService {
  constructor(private api: AxiosInstance) {}

  public async execute(id: string): Promise<BitrixDealCategory> {
    const response = await this.api.get('/crm.dealcategory.get', {
      params: {
        id,
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
    return response.data.result as BitrixDealCategory;
  }
}

export { GetBitrixDealCategoryByIDService };
