import { CompanyRepository } from '../../../company/repositories/implementations/CompanyRepository/CompanyRepository';
import { BitrixContactRepository } from '../../repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { BitrixDealRepository } from '../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { CreateRealEstateDealUseCase } from './CreateRealEstateDealUseCase';

const companiesRepository = new CompanyRepository();
const bitrixDealsRepository = new BitrixDealRepository();
const bitrixContactsRepository = new BitrixContactRepository();
const createRealEstateDealUseCase = new CreateRealEstateDealUseCase(
  bitrixDealsRepository,
  bitrixContactsRepository,
  companiesRepository,
);

export { createRealEstateDealUseCase };
