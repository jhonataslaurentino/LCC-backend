import { DealCategoryRepository } from '../../repositories/implementations/DealCategory';
import { DeleteDealCategoryUseCase } from './DeleteDealCategoryUseCase';

const dealCategoriesRepository = new DealCategoryRepository();
const deleteDealCategoryUseCase = new DeleteDealCategoryUseCase(
  dealCategoriesRepository,
);

export { deleteDealCategoryUseCase };
