import { BitrixContactRepository } from '../../../../Bitrix/repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { BitrixDealRepository } from '../../../../Bitrix/repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { PartnerRepository } from '../../../repositories/implementations/PartnerRepository';
import { CreatePartnerExchangeDealForLegalPersonUseCase } from './CreatePartnerExchangeDealForLegalPersonUseCase';

const bitrixDealsRepository = new BitrixDealRepository();
const partnersRepository = new PartnerRepository();
const bitrixContactsRepository = new BitrixContactRepository();
const createPartnerExchangeDealForLegalPersonUseCase = new CreatePartnerExchangeDealForLegalPersonUseCase(
  bitrixDealsRepository,
  partnersRepository,
  bitrixContactsRepository,
);

export { createPartnerExchangeDealForLegalPersonUseCase };
