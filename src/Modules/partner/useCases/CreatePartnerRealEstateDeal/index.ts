import { BitrixContactRepository } from '../../../Bitrix/repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { BitrixDealRepository } from '../../../Bitrix/repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { CreatePartnerRealEstateDealUseCase } from './CreatePartnerRealEstateDealUseCase';

const partnersRepository = new PartnerRepository();
const bitrixContactsRepository = new BitrixContactRepository();
const bitrixDealsRepository = new BitrixDealRepository();
const createPartnerRealEstateDealUseCase = new CreatePartnerRealEstateDealUseCase(
  partnersRepository,
  bitrixContactsRepository,
  bitrixDealsRepository,
);

export { createPartnerRealEstateDealUseCase };
