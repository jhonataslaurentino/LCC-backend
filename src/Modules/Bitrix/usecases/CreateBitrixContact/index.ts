import { BitrixContactRepository } from '../../repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { CreateBitrixContactUseCase } from './CreateBitrixContactUseCase';

const bitrixContactRepository = BitrixContactRepository.getInstance();
const createBitrixContactUseCase = new CreateBitrixContactUseCase(
  bitrixContactRepository,
);

export { createBitrixContactUseCase };
