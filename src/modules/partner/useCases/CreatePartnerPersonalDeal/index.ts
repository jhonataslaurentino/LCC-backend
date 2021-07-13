import { BitrixContactRepository } from '../../../Bitrix/repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { BitrixDealRepository } from '../../../Bitrix/repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { CreatePartnerPersonalDealController } from './CreatePartnerPersonalDealController';
import { CreatePartnerPersonalDealUseCase } from './CreatePartnerPersonalDealUseCase';

const bitrixDealsRepository = new BitrixDealRepository();
const partnersRepository = new PartnerRepository();
const bitrixContactsRepository = new BitrixContactRepository();
const createPartnerPersonalDealUseCase = new CreatePartnerPersonalDealUseCase(
  bitrixDealsRepository,
  partnersRepository,
  bitrixContactsRepository,
);
const createPartnerPersonalDealController = new CreatePartnerPersonalDealController(
  createPartnerPersonalDealUseCase,
);

export { createPartnerPersonalDealController };
