import { PartnerDealCategoryRepository } from '../../repositories/implementations/PartnerDealCategoryRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { DeletePartnerDealCategoryUseCase } from './DeletePartnerDealCategoryUseCase';

const partnersRepository = new PartnerRepository();
const partnerDealCategoriesRepository = new PartnerDealCategoryRepository();
const deletePartnerDealCategoryUseCase = new DeletePartnerDealCategoryUseCase(
  partnersRepository,
  partnerDealCategoriesRepository,
);

export { deletePartnerDealCategoryUseCase };
