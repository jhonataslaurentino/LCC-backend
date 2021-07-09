import AppError from '../../../../errors/AppError';
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
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const partnerDealCategories = partner.dealCategories as PartnerDealCategory[];
    const foundPartnerDealCategory = partnerDealCategories.find(
      dealCategory => dealCategory.id === partnerDealCategoryID,
    );
    if (typeof foundPartnerDealCategory === 'undefined') {
      throw new AppError('The partner do not have this deal category');
    }
    const deletedPartnerDealCategory = await this.partnerDealCategoriesRepository.delete(
      partnerDealCategoryID,
    );
    return deletedPartnerDealCategory;
  }
}

export { DeletePartnerDealCategoryUseCase };
