import { BitrixContactRepository } from '../../repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { CreateBitrixContactUseCase } from './CreateBitrixContactUseCase';

const bitrixContactRepository = new BitrixContactRepository();
const createBitrixContactUseCase = new CreateBitrixContactUseCase(
  bitrixContactRepository,
);

export { createBitrixContactUseCase };
