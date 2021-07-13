import { PartnerDealCategoryRepository } from '../../repositories/implementations/PartnerDealCategoryRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { ListPartnerDealsCategoriesUseCase } from './ListPartnerDealsCategoriesUseCase';

const partnersRepository = new PartnerRepository();
const partnerDealCategoriesRepository = new PartnerDealCategoryRepository();
const listPartnerDealsCategoriesUseCase = new ListPartnerDealsCategoriesUseCase(
  partnersRepository,
  partnerDealCategoriesRepository,
);

export { listPartnerDealsCategoriesUseCase };
