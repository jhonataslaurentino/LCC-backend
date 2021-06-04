import { BitrixDealCategoryRepository } from '../../repositories/Implementations/BitrixDealCategoryRepository/BitrixDealCategoryRepository';
import { ListBitrixDealsCategoriesUseCase } from './ListBitrixDealsCategoriesUseCase';

const bitrixDealCategoryRepository = BitrixDealCategoryRepository.getInstance();
const listBitrixDealsCategoriesUseCase = new ListBitrixDealsCategoriesUseCase(
  bitrixDealCategoryRepository,
);
export { listBitrixDealsCategoriesUseCase };
