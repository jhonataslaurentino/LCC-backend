import { BitrixDealRepository } from '../../../Bitrix/repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { listPartnerDealsCategoriesUseCase } from '../ListPartnerDealsCategories';
import { GetPartnerDealsInformationUseCase } from './GetPartnerDealsInformationUseCase';

const partnersRepository = new PartnerRepository();
const bitrixDealsRepository = new BitrixDealRepository();

const getPartnerDealsInformationUseCase = new GetPartnerDealsInformationUseCase(
  partnersRepository,
  listPartnerDealsCategoriesUseCase,
  bitrixDealsRepository,
);

export { getPartnerDealsInformationUseCase };
