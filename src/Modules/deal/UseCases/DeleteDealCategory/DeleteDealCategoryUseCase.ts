import { IDealCategoryRepository } from '../../repositories/IDealCategoryRepository';
import { DealCategory } from '../../schemas/DealCategory';

class DeleteDealCategoryUseCase {
  constructor(private dealCategoriesRepository: IDealCategoryRepository) {}

  async execute(dealCategoryID: string): Promise<DealCategory> {
    const deletedDealCategory = await this.dealCategoriesRepository.delete(
      dealCategoryID,
    );
    return deletedDealCategory;
  }
}

export { DeleteDealCategoryUseCase };
