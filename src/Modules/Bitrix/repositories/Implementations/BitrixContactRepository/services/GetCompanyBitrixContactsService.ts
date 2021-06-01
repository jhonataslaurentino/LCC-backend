import { AxiosInstance } from 'axios';
import qs from 'qs';
import {
  IListByCompanyID,
  IListByCompanyIDResponse,
} from '../../../IBitrixContactRepository';

class GetCompanyBitrixContactsService {
  constructor(private api: AxiosInstance) {}

  async execute({
    bitrixCompanyID,
    page,
  }: IListByCompanyID): Promise<IListByCompanyIDResponse> {
    const response = await this.api.get('/crm.contact.list', {
      params: {
        start: page || 0,
        order: { NAME: 'ASC' },
        filter: { '=COMPANY_ID': bitrixCompanyID },
        select: ['ID', 'NAME', 'EMAIL', 'PHONE'],
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
    return response.data;
  }
}

export { GetCompanyBitrixContactsService };
