import { BitrixDealRepository } from '../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { UpdateDealCommentUseCase } from './UpdateDealCommentsUseCase';

const bitrixDealRepository = BitrixDealRepository.getInstance();
const updateDealCommentUseCase = new UpdateDealCommentUseCase(
  bitrixDealRepository,
);
export { updateDealCommentUseCase };
