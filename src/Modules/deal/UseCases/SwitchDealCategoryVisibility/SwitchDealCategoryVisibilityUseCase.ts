import { IDealCategoryRepository } from '../../repositories/IDealCategoryRepository';
import { DealCategory } from '../../schemas/DealCategory';

class SwitchDealCategoryVisibilityUseCase {
  constructor(private dealCategoriesRepository: IDealCategoryRepository) {}

  async execute(dealCategoryID: string): Promise<DealCategory> {
    const changedDealCategory = await this.dealCategoriesRepository.switchVisibility(
      dealCategoryID,
    );
    return changedDealCategory;
  }
}

export { SwitchDealCategoryVisibilityUseCase };
