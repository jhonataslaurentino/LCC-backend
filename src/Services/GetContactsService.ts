import qs from 'qs';

import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';
import { CompanyModel } from '../Modules/company/models/Company';
import GetContactsResponse from '../Schemas/GetContactsResponse';

interface Request {
  companyID: string;
  page?: number;
}

class GetContactsService {
  public async execute({
    companyID,
    page,
  }: Request): Promise<GetContactsResponse> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }
    const responseFromBitrix = (
      await bitrixApi.get(`${bitrixApiMethods.GET_CONTACTS}.json`, {
        params: {
          start: page || 0,
          order: { NAME: 'ASC' },
          filter: { '=COMPANY_ID': company.bitrix_id },
          select: ['ID', 'NAME', 'EMAIL', 'PHONE'],
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        },
      })
    ).data;
    return responseFromBitrix;
  }
}

export default GetContactsService;
