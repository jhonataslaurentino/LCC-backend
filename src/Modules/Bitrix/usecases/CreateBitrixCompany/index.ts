import { BitrixCompanyRepository } from '../../repositories/Implementations/BitrixCompanyRepository/BitrixCompanyRepository';
import { CreateBitrixCompanyUseCase } from './CreateBitrixCompanyUseCase';

const bitrixCompanyRepository = BitrixCompanyRepository.getInstance();
const createBitrixCompanyUseCase = new CreateBitrixCompanyUseCase(
  bitrixCompanyRepository,
);
export { createBitrixCompanyUseCase };
