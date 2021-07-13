import { IBitrixDealCategoryRepository } from '../../repositories/IBitrixDealCategoryRepository';
import BitrixDealCategory from '../../schemas/BitrixDealCategory';

class ListBitrixDealsCategoriesUseCase {
  constructor(
    private bitrixDealCategoryRepository: IBitrixDealCategoryRepository,
  ) {}

  async execute(): Promise<BitrixDealCategory[]> {
    const bitrixDealsCategories = await this.bitrixDealCategoryRepository.list();
    return bitrixDealsCategories;
  }
}

export { ListBitrixDealsCategoriesUseCase };
