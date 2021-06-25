import { Request, Response } from 'express';
import { CommentDealTimelineUseCase } from './CommentDealTimelineUseCase';

class CommentDealTimelineController {
  constructor(private commentDealTimelineUseCase: CommentDealTimelineUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { files } = request;
    const { id: companyID } = request.user;
    const { comment, dealID } = request.body;
    await this.commentDealTimelineUseCase.execute({
      comment,
      dealID,
      files: files as Express.Multer.File[],
      companyID,
    });
    return response.send();
  }
}

export { CommentDealTimelineController };
