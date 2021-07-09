import { DealCategoryRepository } from '../../repositories/implementations/DealCategory';
import { ListDealCategoriesUseCase } from './ListDealCategoriesUseCase';

const dealCategoriesRepository = new DealCategoryRepository();
const listDealCategoriesUseCase = new ListDealCategoriesUseCase(
  dealCategoriesRepository,
);

export { listDealCategoriesUseCase };
