import { BitrixCompanyRepository } from '../../repositories/Implementations/BitrixCompanyRepository/BitrixCompanyRepository';
import { CreateBitrixCompanyUseCase } from './CreateBitrixCompanyUseCase';

const bitrixCompanyRepository = new BitrixCompanyRepository();
const createBitrixCompanyUseCase = new CreateBitrixCompanyUseCase(
  bitrixCompanyRepository,
);
export { createBitrixCompanyUseCase };
