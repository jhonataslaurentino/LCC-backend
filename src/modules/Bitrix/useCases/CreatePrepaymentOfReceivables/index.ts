import { PartnerRepository } from "../../../partner/repositories/implementations/PartnerRepository";
import { CreatePartnerPrepaymentOfReceivablesController } from "../../../partner/useCases/CreatePartnerPrepaymentOfReceivables/CreatePartnerPrepaymentOfReceivablesController";
import { CreatePartnerPrepaymentOfReceivablesUseCase } from "../../../partner/useCases/CreatePartnerPrepaymentOfReceivables/CreatePartnerPrepaymentOfReceivablesUseCase";
import { BitrixContactRepository } from "../../repositories/Implementations/BitrixContactRepository/BitrixContactRepository";
import { BitrixDealRepository } from "../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository";


const bitrixDealsRepository = new BitrixDealRepository();
const partnersRepository = new PartnerRepository();
const bitrixContactsRepository = new BitrixContactRepository();
const createPartnerPrepaymentOfReceivablesUseCase = new CreatePartnerPrepaymentOfReceivablesUseCase(
  bitrixDealsRepository,
  partnersRepository,
  bitrixContactsRepository,
);
const createPartnerPrepaymentOfReceivablesController = new CreatePartnerPrepaymentOfReceivablesController
  (createPartnerPrepaymentOfReceivablesUseCase);
  export { createPartnerPrepaymentOfReceivablesController };
