import { BitrixDealRepository } from '../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { UpdateDealCommentUseCase } from './UpdateDealCommentsUseCase';

const bitrixDealRepository = new BitrixDealRepository();
const updateDealCommentUseCase = new UpdateDealCommentUseCase(
  bitrixDealRepository,
);
export { updateDealCommentUseCase };
