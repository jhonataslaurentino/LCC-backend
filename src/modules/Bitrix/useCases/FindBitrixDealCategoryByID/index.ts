import { BitrixDealCategoryRepository } from '../../repositories/Implementations/BitrixDealCategoryRepository/BitrixDealCategoryRepository';
import { FindBitrixDealCategoryByIDUseCase } from './FindBitrixDealCategoryByIDUseCase';

const bitrixDealCategoryRepository = new BitrixDealCategoryRepository();
const findBitrixDealCategoryByIDUseCase = new FindBitrixDealCategoryByIDUseCase(
  bitrixDealCategoryRepository,
);

export { findBitrixDealCategoryByIDUseCase };
