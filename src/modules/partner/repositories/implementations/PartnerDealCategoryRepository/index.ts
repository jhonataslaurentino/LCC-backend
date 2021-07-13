import { PartnerDealCategory } from '../../../Schemas/PartnerDealsCategories';
import {
  ICreatePartnerDealCategory,
  IPartnerDealCategoryRepository,
} from '../../IPartnerDealCategoryRepository';
import { AddDealCategoryToPartnerService } from './services/AddDealCategoryToPartnerService';
import { DeletePartnerDealCategoryService } from './services/DeletePartnerDealCategoryService';
import { FindPartnerDealCategoryByIDService } from './services/FindPartnerDealCategoryByIDService';
import { FindPartnerDealCategoryByPartnerIDService } from './services/ListPartnerDealCategoriesService';
import { TogglePartnerDealCategoyVisibilityService } from './services/TogglePartnerDealCategoyVisibilityService';

class PartnerDealCategoryRepository implements IPartnerDealCategoryRepository {
  async findByID(partnerDealCategoryID: string): Promise<PartnerDealCategory> {
    const findPartnerDealCategoryByIDService = new FindPartnerDealCategoryByIDService();
    const foundPartnerDealCategory = await findPartnerDealCategoryByIDService.execute(
      partnerDealCategoryID,
    );
    return foundPartnerDealCategory;
  }

  async delete(partnerDealCategoryID: string): Promise<PartnerDealCategory> {
    const deletePartnerDealCategoryService = new DeletePartnerDealCategoryService();
    const deletedPartnerDealCategory = await deletePartnerDealCategoryService.execute(
      partnerDealCategoryID,
    );
    return deletedPartnerDealCategory;
  }

  async toggleVisibility(
    partnerDealCategoryID: string,
  ): Promise<PartnerDealCategory> {
    const togglePartnerDealCategoryVisibilityService = new TogglePartnerDealCategoyVisibilityService();
    const partnerDealCategory = await togglePartnerDealCategoryVisibilityService.execute(
      partnerDealCategoryID,
    );
    return partnerDealCategory;
  }

  async create(data: ICreatePartnerDealCategory): Promise<PartnerDealCategory> {
    const addDealCategoryToPartnerService = new AddDealCategoryToPartnerService();
    const addPartnerDealCategory = await addDealCategoryToPartnerService.execute(
      data,
    );
    return addPartnerDealCategory;
  }

  async findByPartner(partnerID: string): Promise<PartnerDealCategory[]> {
    const findPartnerDealCategoryByPartnerIDService = new FindPartnerDealCategoryByPartnerIDService();
    const partnerDealCategories = await findPartnerDealCategoryByPartnerIDService.execute(
      partnerID,
    );
    return partnerDealCategories;
  }
}

export { PartnerDealCategoryRepository };
