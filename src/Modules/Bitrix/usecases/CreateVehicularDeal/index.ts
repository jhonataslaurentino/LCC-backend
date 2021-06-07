import { CompanyRepository } from '../../../company/repositories/implementations/CompanyRepository/CompanyRepository';
import { BitrixContactRepository } from '../../repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { BitrixDealRepository } from '../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { CreateVehicularDealUseCase } from './CreateVehicularDealUseCase';

const bitrixDealsRepository = new BitrixDealRepository();
const bitrixContactsRepository = new BitrixContactRepository();
const companiesRepository = new CompanyRepository();
const createVehicularDealUseCase = new CreateVehicularDealUseCase(
  bitrixDealsRepository,
  bitrixContactsRepository,
  companiesRepository,
);

export { createVehicularDealUseCase };
