import { CompanyRepository } from '../../../company/repositories/implementations/CompanyRepository/CompanyRepository';
import { BitrixContactRepository } from '../../repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { BitrixDealRepository } from '../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { CreatePersonalDealController } from './CreatePersonalDealController';
import { CreatePersonalDealUseCase } from './CreatePersonalDealUseCase';

const bitrixDealsRepository = new BitrixDealRepository();
const companiesRepository = new CompanyRepository();
const bitrixContactsRepository = new BitrixContactRepository();
const createPersonalDealUseCase = new CreatePersonalDealUseCase(
  bitrixDealsRepository,
  companiesRepository,
  bitrixContactsRepository,
);
const createPersonalDealController = new CreatePersonalDealController(
  createPersonalDealUseCase,
);

export { createPersonalDealController };
