import { DealCategoryRepository } from '../../repositories/implementations/DealCategory';
import { SwitchDealCategoryVisibilityUseCase } from './SwitchDealCategoryVisibilityUseCase';

const dealCategoriesRepository = new DealCategoryRepository();
const switchDealCategoryVisibilityUseCase = new SwitchDealCategoryVisibilityUseCase(
  dealCategoriesRepository,
);

export { switchDealCategoryVisibilityUseCase };
