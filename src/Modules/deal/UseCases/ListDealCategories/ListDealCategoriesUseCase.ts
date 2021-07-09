import { IDealCategoryRepository } from '../../repositories/IDealCategoryRepository';
import { DealCategory } from '../../schemas/DealCategory';

class ListDealCategoriesUseCase {
  constructor(private dealCategoriesRepository: IDealCategoryRepository) {}

  async execute(): Promise<DealCategory[]> {
    const dealCategories = await this.dealCategoriesRepository.list();
    return dealCategories;
  }
}

export { ListDealCategoriesUseCase };
