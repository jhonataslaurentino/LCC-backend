import { BitrixContactRepository } from '../../../../Bitrix/repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { BitrixDealRepository } from '../../../../Bitrix/repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { PartnerRepository } from '../../../repositories/implementations/PartnerRepository';
import { CreatePartnerExchangeDealForPhysicalPersonUseCase } from './CreatePartnerExchangeDealForPhysicalPersonUseCase';

const bitrixDealsRepository = new BitrixDealRepository();
const partnersRepository = new PartnerRepository();
const bitrixContactsRepository = new BitrixContactRepository();
const createPartnerExchangeDealForPhysicalPersonUseCase = new CreatePartnerExchangeDealForPhysicalPersonUseCase(
  bitrixDealsRepository,
  partnersRepository,
  bitrixContactsRepository,
);

export { createPartnerExchangeDealForPhysicalPersonUseCase };
