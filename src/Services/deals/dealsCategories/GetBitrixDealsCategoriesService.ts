import bitrixApi from '../../../api/bitrix';
import BitrixDealCategory from '../../../Schemas/BitrixDealCategory';

export interface BitrixApiResponse {
  result: BitrixDealCategory[];
  total: number;
}

class GetBitrixDealsCategoriesService {
  public async execute(): Promise<BitrixDealCategory[]> {
    const response = await bitrixApi.get('/crm.dealcategory.list');
    const { result } = response.data as BitrixApiResponse;
    return result;
  }
}

export default GetBitrixDealsCategoriesService;
