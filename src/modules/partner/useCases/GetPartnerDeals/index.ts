import { BitrixDealRepository } from '../../../Bitrix/repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { PartnerDealCategoryRepository } from '../../repositories/implementations/PartnerDealCategoryRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { GetPartnerDealsUseCase } from './GetPartnerDealsUseCase';

const partnersRepository = new PartnerRepository();
const bitrixDealsRepository = new BitrixDealRepository();
const partnerDealCategoriesRepository = new PartnerDealCategoryRepository();
const getPartnerDealsUseCase = new GetPartnerDealsUseCase(
  partnersRepository,
  bitrixDealsRepository,
  partnerDealCategoriesRepository,
);

export { getPartnerDealsUseCase };
