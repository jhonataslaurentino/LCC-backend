import { BitrixDeal } from '../schemas/BitrixDeal';
import BitrixDealCategory from '../schemas/BitrixDealCategory';

interface IBitrixDealCategoryRepository {
  findByID(id: string): Promise<BitrixDealCategory>;
  list(): Promise<BitrixDealCategory[]>;
}

export { IBitrixDealCategoryRepository };
