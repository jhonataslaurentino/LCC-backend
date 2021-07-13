import { BitrixContactRepository } from '../../../Bitrix/repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { BitrixDealRepository } from '../../../Bitrix/repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { CreatePartnerConsignedDealController } from './CreatePartnerConsignedDealController';
import { CreatePartnerConsignedDealUseCase } from './CreatePartnerConsignedDealUseCase';

const bitrixDealsRepository = new BitrixDealRepository();
const partnersRepository = new PartnerRepository();
const bitrixContactsRepository = new BitrixContactRepository();

const createPartnerConsignedDealUseCase = new CreatePartnerConsignedDealUseCase(
  bitrixDealsRepository,
  partnersRepository,
  bitrixContactsRepository,
);
const createPartnerConsignedDealController = new CreatePartnerConsignedDealController(
  createPartnerConsignedDealUseCase,
);

export { createPartnerConsignedDealController };
