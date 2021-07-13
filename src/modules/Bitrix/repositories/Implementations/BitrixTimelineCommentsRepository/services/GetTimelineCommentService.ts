import { AxiosInstance } from 'axios';
import { BitrixTimeLineComment } from '../../../../schemas/BitrixTimeLineComment';

class GetTimelineCommentService {
  constructor(private api: AxiosInstance) {}

  async execute(id: number): Promise<BitrixTimeLineComment> {
    const response = await this.api.get('/crm.timeline.comment.get', {
      params: {
        id,
      },
    });
    return response.data.result;
  }
}

export { GetTimelineCommentService };
