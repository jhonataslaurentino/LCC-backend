import { IPartnerDealCategoryRepository } from '../../repositories/IPartnerDealCategoryRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { PartnerDealCategory } from '../../Schemas/PartnerDealsCategories';

interface IDeletePartnerDealCategoryDTO {
  partnerID: string;
  partnerDealCategoryID: string;
}

class DeletePartnerDealCategoryUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private partnerDealCategoriesRepository: IPartnerDealCategoryRepository,
  ) {}

  async execute({
    partnerDealCategoryID,
    partnerID,
  }: IDeletePartnerDealCategoryDTO): Promise<PartnerDealCategory> {
    const deletedPartnerDealCategory = await this.partnerDealCategoriesRepository.delete(
      {
        partnerDealCategoryID,
        partnerID,
      },
    );
    return deletedPartnerDealCategory;
  }
}

export { DeletePartnerDealCategoryUseCase };
