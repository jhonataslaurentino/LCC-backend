import { BitrixCompanyRepository } from '../../repositories/Implementations/BitrixCompanyRepository/BitrixCompanyRepository';
import { FindBitrixCompanyByEmailUseCase } from './FindBitrixCompanyByEmailUseCase';

const bitrixCompanyRepository = BitrixCompanyRepository.getInstance();
const findBitrixCompanyByEmailUseCase = new FindBitrixCompanyByEmailUseCase(
  bitrixCompanyRepository,
);

export { findBitrixCompanyByEmailUseCase };
