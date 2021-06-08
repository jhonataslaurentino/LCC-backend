import { IBitrixDealCategoryRepository } from '../../repositories/IBitrixDealCategoryRepository';
import BitrixDealCategory from '../../schemas/BitrixDealCategory';

class FindBitrixDealCategoryByIDUseCase {
  constructor(
    private bitrixDealCategoryRepository: IBitrixDealCategoryRepository,
  ) {}

  async execute(id: string): Promise<BitrixDealCategory> {
    const bitrixDealCategory = await this.bitrixDealCategoryRepository.findByID(
      id,
    );
    return bitrixDealCategory;
  }
}

export { FindBitrixDealCategoryByIDUseCase };
