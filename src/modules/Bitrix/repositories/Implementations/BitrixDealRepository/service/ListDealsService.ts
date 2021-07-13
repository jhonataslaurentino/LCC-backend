import { AxiosInstance } from 'axios';
import qs from 'qs';
import {
  IListDealsDTO,
  IListDealsResponse,
} from '../../../IBitrixDealRepository';

class ListDealsService {
  constructor(private api: AxiosInstance) {}

  async execute({
    filter,
    page,
    categoryID,
    companyID,
  }: IListDealsDTO): Promise<IListDealsResponse> {
    const responseFromBitrix = await this.api.get('/crm.deal.list', {
      params: {
        start: page,
        order: { DATA_MODIFY: 'ASC' },
        filter: {
          '=CATEGORY_ID': categoryID,
          '=COMPANY_ID': companyID,
          ...filter,
        },
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
    const { result, total, next } = responseFromBitrix.data;
    const response = {
      result,
      total,
      next,
    };
    return response;
  }
}

export { ListDealsService };
