import { AxiosInstance } from 'axios';
import qs from 'qs';
import { BitrixTimeLineComment } from '../../../../schemas/BitrixTimeLineComment';
import { ListDealCommentsTimeLineSchema } from '../../../../useCases/ListDealCommentsTimeline/ListDealCommentsTimeLineSchema';
import { IListCommentsDTO } from '../../../IBitrixTimeLineCommentsRepository';

class ListEntityCommentsService {
  constructor(private api: AxiosInstance) {}

  async execute({
    ENTITY_ID,
    ENTITY_TYPE,
    filter,
  }: IListCommentsDTO): Promise<ListDealCommentsTimeLineSchema> {
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
    const comments: BitrixTimeLineComment[] = [];
    const { result, total } = response.data as ListDealCommentsTimeLineSchema;
    result.forEach(comment => {
      comments.push({
        AUTHOR_ID: comment.AUTHOR_ID,
        COMMENT: comment.COMMENT,
        CREATED: comment.CREATED,
        ENTITY_TYPE: comment.ENTITY_TYPE,
        FILES: (!!comment.FILES && Object.values(comment.FILES)) || [],
        ID: comment.ID,
      });
    });
    return {
      result: comments,
      total,
    };
  }
}

export { ListEntityCommentsService };
