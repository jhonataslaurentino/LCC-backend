import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';
import Deal from '../Schemas/Deal';

interface Request {
  id: number;
}

class GetDealService {
  public async execute({ id }: Request): Promise<Deal> {
    const response = await bitrixApi.get(`${bitrixApiMethods.GET_DEAL}.json`, {
      params: {
        id,
      },
    });
    if (response.data.error) {
      throw new Error('it can not get the deal');
    }
    const deal = response.data.result as Deal;
    return deal;
  }
}

export default GetDealService;
