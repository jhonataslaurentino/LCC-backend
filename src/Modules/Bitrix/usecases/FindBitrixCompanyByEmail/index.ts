import { BitrixCompanyRepository } from '../../repositories/Implementations/BitrixCompanyRepository/BitrixCompanyRepository';
import { FindBitrixCompanyByEmailUseCase } from './FindBitrixCompanyByEmailUseCase';

const bitrixCompanyRepository = new BitrixCompanyRepository();
const findBitrixCompanyByEmailUseCase = new FindBitrixCompanyByEmailUseCase(
  bitrixCompanyRepository,
);

export { findBitrixCompanyByEmailUseCase };
