import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';
import { IDeal } from '../dtos/IDeal';

interface Request {
  nextPage?: number;
}

interface Response {
  result: IDeal[];
  total: number;
  next: number;
}

class ListDealsService {
  public async execute({ nextPage }: Request): Promise<Response> {
    const response = (
      await bitrixApi.get(
        `${bitrixApiMethods.GET_DEALS}.json/${
          nextPage && `?start=${nextPage}`
        }`,
      )
    ).data as Response;
    return response;
  }
}

export default ListDealsService;
