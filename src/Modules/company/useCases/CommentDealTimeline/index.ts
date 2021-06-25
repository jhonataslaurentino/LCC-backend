import { BitrixDealRepository } from '../../../Bitrix/repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { BitrixTimeLineCommentsRepository } from '../../../Bitrix/repositories/Implementations/BitrixTimelineCommentsRepository/BitrixTimeLineCommentsRepository';
import { CompanyRepository } from '../../repositories/implementations/CompanyRepository/CompanyRepository';
import { CommentDealTimelineController } from './CommentDealTimelineController';
import { CommentDealTimelineUseCase } from './CommentDealTimelineUseCase';

const companiesRepository = new CompanyRepository();
const bitrixDealsRepository = new BitrixDealRepository();
const bitrixTimelineCommentsRepository = new BitrixTimeLineCommentsRepository();
const commentDealTimelineUseCase = new CommentDealTimelineUseCase(
  companiesRepository,
  bitrixDealsRepository,
  bitrixTimelineCommentsRepository,
);
const commentDealTimelineController = new CommentDealTimelineController(
  commentDealTimelineUseCase,
);

export { commentDealTimelineController };
