import { DealCategory } from '../../../deal/schemas/DealCategory';
import { PartnerDealCategory } from '../../Schemas/PartnerDealsCategories';
import { addPartnerDealCategoryUseCase } from '../AddPartnerDealCategory';
import { deletePartnerDealCategoryUseCase } from '../DeletePartnerDealCategory';
import { listPartnerDealsCategoriesUseCase } from '../ListPartnerDealsCategories';
import { TogglePartnerDealCategorySchema } from './TogglePartnerDealCategorySchema';

interface IRequest {
  togglePartnerDealCategorySchemas: TogglePartnerDealCategorySchema[];
  partnerID: string;
}

class TogglePartnerDealCategoriesUseCase {
  async execute({
    togglePartnerDealCategorySchemas,
    partnerID,
  }: IRequest): Promise<PartnerDealCategory[]> {
    const partnerDealCategories = await listPartnerDealsCategoriesUseCase.execute(
      partnerID,
    );
    // eslint-disable-next-line no-restricted-syntax
    for await (const {
      checked,
      dealCategoryID,
    } of togglePartnerDealCategorySchemas) {
      const partnerDealCategoryIndex = partnerDealCategories.findIndex(
        partnerDealCategory => {
          const dealCategory = partnerDealCategory.dealCategory as DealCategory;
          return dealCategory.id === dealCategoryID;
        },
      );
      if (checked && partnerDealCategoryIndex < 0) {
        const addedPartnerDealCategory = await addPartnerDealCategoryUseCase.execute(
          {
            dealCategoryID,
            partnerID,
          },
        );
        partnerDealCategories.push(addedPartnerDealCategory);
      } else if (!checked && partnerDealCategoryIndex > -1) {
        const deletedPartnerDealCategory = await deletePartnerDealCategoryUseCase.execute(
          {
            partnerDealCategoryID:
              partnerDealCategories[partnerDealCategoryIndex].id,
            partnerID,
          },
        );
        const foundPartnerDealCategoryIndex = partnerDealCategories.findIndex(
          partnerDealCategory =>
            partnerDealCategory.id === deletedPartnerDealCategory.id,
        );
        if (foundPartnerDealCategoryIndex > -1) {
          partnerDealCategories.splice(foundPartnerDealCategoryIndex, 1);
        }
      }
    }

    return partnerDealCategories;
  }
}

export { TogglePartnerDealCategoriesUseCase };
