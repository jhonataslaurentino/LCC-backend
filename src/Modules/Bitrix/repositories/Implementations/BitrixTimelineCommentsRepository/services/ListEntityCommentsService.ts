import { AxiosInstance } from 'axios';
import qs from 'qs';
import AppError from '../../../../../../errors/AppError';
import {
  IListCommentsDTO,
  IListCommentsResponse,
} from '../../../IBitrixTimeLineCommentsRepository';

class ListEntityCommentsService {
  constructor(private api: AxiosInstance) {}

  async execute({
    ENTITY_ID,
    ENTITY_TYPE,
    filter,
  }: IListCommentsDTO): Promise<IListCommentsResponse> {
    const response = await this.api.get('/crm.timeline.comment.list', {
      params: {
        filter: {
          ENTITY_ID,
          ENTITY_TYPE,
          ...filter,
        },
        select: [
          'ID',
          'CREATED',
          'ENTITY_ID',
          'ENTITY_TYPE',
          'AUTHOR_ID',
          'COMMENT',
          'FILES',
        ],
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
    return response.data.result;
  }
}

export { ListEntityCommentsService };
