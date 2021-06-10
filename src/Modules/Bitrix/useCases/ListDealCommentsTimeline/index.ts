import { BitrixTimeLineCommentsRepository } from '../../repositories/Implementations/BitrixTimelineCommentsRepository/BitrixTimeLineCommentsRepository';
import { ListDealCommentsTimelineUseCase } from './ListDealCommentsTimelineUseCase';

const bitrixTimelineCommentsRepository = new BitrixTimeLineCommentsRepository();
const listDealCommentsTimelineUseCase = new ListDealCommentsTimelineUseCase(
  bitrixTimelineCommentsRepository,
);

export { listDealCommentsTimelineUseCase };
