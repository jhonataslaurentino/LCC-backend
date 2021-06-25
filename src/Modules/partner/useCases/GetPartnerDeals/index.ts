import { BitrixDealRepository } from '../../../Bitrix/repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { GetPartnerDealsUseCase } from './GetPartnerDealsUseCase';

const partnersRepository = new PartnerRepository();
const bitrixDealsRepository = new BitrixDealRepository();
const getPartnerDealsUseCase = new GetPartnerDealsUseCase(
  partnersRepository,
  bitrixDealsRepository,
);

export { getPartnerDealsUseCase };
