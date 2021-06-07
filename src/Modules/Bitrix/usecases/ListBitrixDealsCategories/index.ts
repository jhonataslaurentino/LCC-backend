import { BitrixDealCategoryRepository } from '../../repositories/Implementations/BitrixDealCategoryRepository/BitrixDealCategoryRepository';
import { ListBitrixDealsCategoriesUseCase } from './ListBitrixDealsCategoriesUseCase';

const bitrixDealCategoryRepository = new BitrixDealCategoryRepository();
const listBitrixDealsCategoriesUseCase = new ListBitrixDealsCategoriesUseCase(
  bitrixDealCategoryRepository,
);
export { listBitrixDealsCategoriesUseCase };
