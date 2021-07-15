import { BitrixContactRepository } from '../../../Bitrix/repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { BitrixDealRepository } from '../../../Bitrix/repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { CreatePartnerPrepaymentOfReceivablesController } from './CreatePartnerPrepaymentOfReceivablesController';
import { CreatePartnerPrepaymentOfReceivablesUseCase } from './CreatePartnerPrepaymentOfReceivablesUseCase';

const bitrixDealsRepository = new BitrixDealRepository();
const partnersRepository = new PartnerRepository();
const bitrixContactsRepository = new BitrixContactRepository();
const createPartnerPrepaymentOfReceivablesUseCase = new CreatePartnerPrepaymentOfReceivablesUseCase(
  bitrixDealsRepository,
  partnersRepository,
  bitrixContactsRepository,
);
const createPartnerPrepaymentOfReceivablesController = new CreatePartnerPrepaymentOfReceivablesController(
  createPartnerPrepaymentOfReceivablesUseCase,
);

export { createPartnerPrepaymentOfReceivablesController };
