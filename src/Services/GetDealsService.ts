import qs from 'qs';
import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';
import { IDeal } from '../dtos/IDeal';
import CompanyModel from '../Entities/Company';

interface Request {
  page?: number;
  companyID: string;
}

interface Response {
  result: IDeal[];
  total: number;
  next: number;
}

class GetDealsService {
  public async execute({ page, companyID }: Request): Promise<Response> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }

    const responseFromBitrix = (
      await bitrixApi.get(`${bitrixApiMethods.GET_DEALS}.json`, {
        params: {
          start: page || 0,
          order: { TITLE: 'ASC' },
          filter: { '=COMPANY_ID': company.bitrix_id },
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

export default GetDealsService;
