import { PartnerDealCategoryRepository } from '../../repositories/implementations/PartnerDealCategoryRepository';
import { AddPartnerDealCategoryUseCase } from './AddPartnerDealCategoryUseCase';

const partnerDealCategoriesRepository = new PartnerDealCategoryRepository();
const addPartnerDealCategoryUseCase = new AddPartnerDealCategoryUseCase(
  partnerDealCategoriesRepository,
);

export { addPartnerDealCategoryUseCase };
