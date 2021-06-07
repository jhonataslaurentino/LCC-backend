import { BitrixDealRepository } from '../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { ListDealsByCompanyIDUseCase } from './ListDealsByCompanyIDUseCase';

const bitrixDealsRepository = new BitrixDealRepository();
const listBitrixDealsByCompanyIDUseCase = new ListDealsByCompanyIDUseCase(
  bitrixDealsRepository,
);

export { listBitrixDealsByCompanyIDUseCase };
