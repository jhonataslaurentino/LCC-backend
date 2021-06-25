import { AxiosInstance } from 'axios';
import bitrixApi from '../../../../../api/bitrix';
import { BitrixTimeLineComment } from '../../../schemas/BitrixTimeLineComment';
import { ListDealCommentsTimeLineSchema } from '../../../useCases/ListDealCommentsTimeline/ListDealCommentsTimeLineSchema';
import {
  IAddCommentDTO,
  IBitrixTimeLineCommentsRepository,
  IListCommentsDTO,
} from '../../IBitrixTimeLineCommentsRepository';
import { AddCommentAtTimelineService } from './services/AddCommentAtTimelineService';
import { GetTimelineCommentService } from './services/GetTimelineCommentService';
import { ListEntityCommentsService } from './services/ListEntityCommentsService';

class BitrixTimeLineCommentsRepository
  implements IBitrixTimeLineCommentsRepository {
  private api: AxiosInstance;

  constructor() {
    this.api = bitrixApi;
  }

  async get(id: number): Promise<BitrixTimeLineComment> {
    const getTimelineCommentService = new GetTimelineCommentService(this.api);
    const comment = await getTimelineCommentService.execute(id);
    return comment;
  }

  async add(data: IAddCommentDTO): Promise<BitrixTimeLineComment> {
    const addCommentAtTimelineService = new AddCommentAtTimelineService(
      this.api,
    );
    const commentID = await addCommentAtTimelineService.execute(data);
    const comment = await this.get(commentID);
    return comment;
  }

  async list({
    ENTITY_ID,
    ENTITY_TYPE,
    filter,
  }: IListCommentsDTO): Promise<ListDealCommentsTimeLineSchema> {
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
