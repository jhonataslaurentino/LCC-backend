import qs from 'qs';
import bitrixApi from '../../../api/bitrix';
import BitrixDealCategory from '../../../Schemas/BitrixDealCategory';

interface Request {
  id: number;
}

class GetBitrixDealCategoryService {
  public async execute({ id }: Request): Promise<BitrixDealCategory> {
    const response = await bitrixApi.get('/crm.dealcategory.get', {
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

export default GetBitrixDealCategoryService;
