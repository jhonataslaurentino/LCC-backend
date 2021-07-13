import {
  ICreateDealCategoryData,
  IDealCategoryRepository,
} from '../../repositories/IDealCategoryRepository';
import { DealCategory } from '../../schemas/DealCategory';

class CreateDealCategoryUseCase {
  constructor(private dealCategoriesRepository: IDealCategoryRepository) {}

  async execute(data: ICreateDealCategoryData): Promise<DealCategory> {
    const createdDealCategory = await this.dealCategoriesRepository.create(
      data,
    );
    return createdDealCategory;
  }
}

export { CreateDealCategoryUseCase };
