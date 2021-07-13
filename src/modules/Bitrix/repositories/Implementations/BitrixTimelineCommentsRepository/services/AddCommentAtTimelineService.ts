import { AxiosInstance } from 'axios';
import fs from 'fs';
import { IAddCommentDTO } from '../../../IBitrixTimeLineCommentsRepository';

class AddCommentAtTimelineService {
  constructor(private api: AxiosInstance) {}

  async execute({
    COMMENT,
    ENTITY_ID,
    ENTITY_TYPE,
    files,
  }: IAddCommentDTO): Promise<number> {
    const response = await this.api.post('/crm.timeline.comment.add', {
      fields: {
        ENTITY_ID,
        ENTITY_TYPE,
        COMMENT,
        FILES: files.map(file => {
          const fileEncoded = fs.readFileSync(file.path, {
            encoding: 'base64',
          });
          return {
            NAME: file.originalname,
            fileEncoded,
          };
        }),
      },
    });
    files.forEach(async file => {
      await fs.promises.unlink(file.path);
    });
    return response.data.result;
  }
}

export { AddCommentAtTimelineService };
