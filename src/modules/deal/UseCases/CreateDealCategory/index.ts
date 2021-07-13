import { DealCategoryRepository } from '../../repositories/implementations/DealCategory';
import { CreateDealCategoryUseCase } from './CreateDealCategoryUseCase';

const dealCategoriesRepository = new DealCategoryRepository();
const createDealCategoryUseCase = new CreateDealCategoryUseCase(
  dealCategoriesRepository,
);

export { createDealCategoryUseCase };
