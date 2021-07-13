import { DealCategory } from '../schemas/DealCategory';

interface ICreateDealCategoryData {
  name: string;
  bitrix_id: number;
  isVisible?: boolean;
  bitrixProductsField: string;
  isInDevelopment: boolean;
  url: string;
}
interface IDealCategoryRepository {
  create(data: ICreateDealCategoryData): Promise<DealCategory>;
  delete(dealCategoryID: string): Promise<DealCategory>;
  list(): Promise<DealCategory[]>;
  switchVisibility(dealCategoryID: string): Promise<DealCategory>;
  findByID(id: string): Promise<DealCategory | null>;
}

export { IDealCategoryRepository, ICreateDealCategoryData };
