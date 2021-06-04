import { AxiosInstance } from 'axios';
import qs from 'qs';
import { BitrixDeal } from '../../../../schemas/BitrixDeal';

interface Request {
  page: number;
  dealCategoryID: string;
  companyID: string;
}

interface Response {
  result: BitrixDeal[];
  total: number;
  next: number;
}

class GetBitrixDealsByCompanyIDService {
  constructor(private api: AxiosInstance) {}

  async execute({
    page = 0,
    companyID,
    dealCategoryID = '1',
  }: Request): Promise<Response> {
    const responseFromBitrix = (
      await this.api.get(`/crm.deal.list`, {
        params: {
          start: page,
          order: { DATA_MODIFY: 'ASC' },
          filter: { '=COMPANY_ID': companyID, '=CATEGORY_ID': dealCategoryID },
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        },
      })
    ).data;
    const { result, total, next } = responseFromBitrix;
    const response = {
      result,
      total,
      next,
    } as Response;
    return response;
  }
}

export { GetBitrixDealsByCompanyIDService };
