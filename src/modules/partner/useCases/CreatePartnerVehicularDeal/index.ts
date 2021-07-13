import { BitrixContactRepository } from '../../../Bitrix/repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { BitrixDealRepository } from '../../../Bitrix/repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { CreatePartnerVehicularDealUseCase } from './CreatePartnerVehicularDealUseCase';

const partnersRepository = new PartnerRepository();
const bitrixContactsRepository = new BitrixContactRepository();
const bitrixDealsRepository = new BitrixDealRepository();
const createPartnerVehicularDealUse = new CreatePartnerVehicularDealUseCase(
  partnersRepository,
  bitrixContactsRepository,
  bitrixDealsRepository,
);

export { createPartnerVehicularDealUse };
