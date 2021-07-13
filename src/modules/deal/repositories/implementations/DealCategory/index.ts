import { DealCategory } from '../../../schemas/DealCategory';
import {
  ICreateDealCategoryData,
  IDealCategoryRepository,
} from '../../IDealCategoryRepository';
import { CreateDealCategoryService } from './services/CreateDealCategoryService';
import DeleteDealCategoryService from './services/DeleteDealCategoryService';
import { FindDealCategoryByIDService } from './services/FindDealCategoryByIDService';
import { ListDealsCategoriesService } from './services/ListDealsCategoriesService';
import { SwitchDealCategoryVisibilityService } from './services/SwitchDealVisibilityService';

class DealCategoryRepository implements IDealCategoryRepository {
  async findByID(id: string): Promise<DealCategory> {
    const findDealCategoryByIDService = new FindDealCategoryByIDService();
    const foundDealCategory = await findDealCategoryByIDService.execute(id);
    return foundDealCategory;
  }

  async switchVisibility(dealCategoryID: string): Promise<DealCategory> {
    const switchDealCategoryVisibilityService = new SwitchDealCategoryVisibilityService();
    const dealCategoryChanged = await switchDealCategoryVisibilityService.execute(
      dealCategoryID,
    );
    return dealCategoryChanged;
  }

  async list(): Promise<DealCategory[]> {
    const listDealCategoriesService = new ListDealsCategoriesService();
    const dealsCategories = await listDealCategoriesService.execute();
    return dealsCategories;
  }

  async create(data: ICreateDealCategoryData): Promise<DealCategory> {
    const createDealCategoryService = new CreateDealCategoryService();
    const createdDealCategory = await createDealCategoryService.execute(data);
    return createdDealCategory;
  }

  async delete(dealCategoryID: string): Promise<DealCategory> {
    const deleteDealCategoryService = new DeleteDealCategoryService();
    const deletedDealCategory = await deleteDealCategoryService.execute(
      dealCategoryID,
    );
    return deletedDealCategory;
  }
}

export { DealCategoryRepository };
