import { AxiosInstance } from 'axios';
import bitrixApi from '../../../../../api/bitrix';
import {
  IBitrixTimeLineCommentsRepository,
  IListCommentsDTO,
  IListCommentsResponse,
} from '../../IBitrixTimeLineCommentsRepository';
import { ListEntityCommentsService } from './services/ListEntityCommentsService';

class BitrixTimeLineCommentsRepository
  implements IBitrixTimeLineCommentsRepository {
  private api: AxiosInstance;

  constructor() {
    this.api = bitrixApi;
  }

  async list({
    ENTITY_ID,
    ENTITY_TYPE,
    filter,
  }: IListCommentsDTO): Promise<IListCommentsResponse> {
    const listEntityCommentsService = new ListEntityCommentsService(this.api);
    const data = await listEntityCommentsService.execute({
      ENTITY_ID,
      ENTITY_TYPE,
      filter,
    });

    return data;
  }
}

export { BitrixTimeLineCommentsRepository };
