import AppError from '../../../../errors/AppError';
import { IPartnerDealCategoryRepository } from '../../repositories/IPartnerDealCategoryRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { PartnerDealCategory } from '../../Schemas/PartnerDealsCategories';

class ListPartnerDealsCategoriesUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private partnerDealCategoriesRepository: IPartnerDealCategoryRepository,
  ) {}

  async execute(partnerID: string): Promise<PartnerDealCategory[]> {
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const isAMasterPartner = !partner.createdBy;
    const dealsCategories = await this.partnerDealCategoriesRepository.findByPartner(
      isAMasterPartner ? partner.id : partner.createdBy,
    );
    const filteredDealsCategories = dealsCategories.filter(
      dealCategory => isAMasterPartner || dealCategory.isVisible,
    );
    return filteredDealsCategories;
  }
}

export { ListPartnerDealsCategoriesUseCase };
