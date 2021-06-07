import { BitrixDealRepository } from '../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { GetBitrixDealUseCase } from './GetBitrixDealUseCase';

const bitrixDealsRepository = new BitrixDealRepository();
const getBitrixDealUseCase = new GetBitrixDealUseCase(bitrixDealsRepository);
export { getBitrixDealUseCase };
