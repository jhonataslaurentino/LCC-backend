import qs from 'qs';
import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';
import CompanyModel from '../Entities/Company';
import Deal from '../Schemas/BitrixDeal';

interface Request {
  id: number;
  companyID: string;
}

class GetDealService {
  public async execute({ id, companyID }: Request): Promise<Deal> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }

    const response = await bitrixApi.get(`${bitrixApiMethods.GET_DEALS}.json`, {
      params: {
        start: 0,
        order: { TITLE: 'ASC' },
        filter: { '=COMPANY_ID': company.bitrix_id, '=ID': id },
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
    if (response.data.error) {
      throw new Error('it can not get the deal');
    }
    const deal = response.data.result as Deal[];
    return deal[0];
  }
}

export default GetDealService;
