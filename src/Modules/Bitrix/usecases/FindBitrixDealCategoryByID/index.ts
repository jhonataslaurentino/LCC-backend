import { BitrixDealCategoryRepository } from '../../repositories/Implementations/BitrixDealCategoryRepository/BitrixDealCategoryRepository';
import { FindBitrixDealCategoryByIDUseCase } from './FindBitrixDealCategoryByIDUseCase';

const bitrixDealCategoryRepository = BitrixDealCategoryRepository.getInstance();
const findBitrixDealCategoryByIDUseCase = new FindBitrixDealCategoryByIDUseCase(
  bitrixDealCategoryRepository,
);

export { findBitrixDealCategoryByIDUseCase };
