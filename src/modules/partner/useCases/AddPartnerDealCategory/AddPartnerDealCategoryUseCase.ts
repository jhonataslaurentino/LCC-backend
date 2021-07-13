import { IPartnerDealCategoryRepository } from '../../repositories/IPartnerDealCategoryRepository';
import { PartnerDealCategory } from '../../Schemas/PartnerDealsCategories';

interface IAddPartnerDealCategoryDTO {
  partnerID: string;
  dealCategoryID: string;
}

class AddPartnerDealCategoryUseCase {
  constructor(
    private partnerDealCategoriesRepository: IPartnerDealCategoryRepository,
  ) {}

  async execute({
    dealCategoryID,
    partnerID,
  }: IAddPartnerDealCategoryDTO): Promise<PartnerDealCategory> {
    const dealCategory = await this.partnerDealCategoriesRepository.create({
      dealCategoryID,
      partnerID,
    });
    return dealCategory;
  }
}

export { AddPartnerDealCategoryUseCase };
