import qs from 'qs';
import bitrixApi from '../../api/bitrix';
import { IDeal } from '../../dtos/IDeal';
import CompanyModel from '../../Entities/Company';
import DealCategoryModel from '../../Entities/DealCategory';

interface Request {
  companyID: string;
  dealCategoryID: string;
  page?: number;
}

interface Response {
  result: IDeal[];
  total: number;
  next: number;
}

class GetDealsUpdatedService {
  public async execute({
    dealCategoryID,
    companyID,
    page,
  }: Request): Promise<Response> {
    const dealCategory = await DealCategoryModel.findById(dealCategoryID);
    if (!dealCategory) {
      throw new Error('Deal category does not exists');
    }
    const company = await CompanyModel.findById(companyID);
    if (!company) {
      throw new Error('Company does not exists');
    }
    const responseFromBitrix = (
      await bitrixApi.get('/crm.deal.list', {
        params: {
          start: page || 0,
          order: { DATE_CREATE: 'ASC' },
          filter: {
            '=COMPANY_ID': company.bitrix_id,
            '=CATEGORY_ID': dealCategory.bitrix_id,
          },
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

export default GetDealsUpdatedService;
