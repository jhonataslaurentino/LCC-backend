import { BitrixDealRepository } from '../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { GetBitrixDealFieldsUseCase } from './GetBitrixDealFieldsUseCase';

const bitrixDealsRepository = new BitrixDealRepository();
const getBitrixDealFieldsUseCase = new GetBitrixDealFieldsUseCase(
  bitrixDealsRepository,
);
export { getBitrixDealFieldsUseCase };
