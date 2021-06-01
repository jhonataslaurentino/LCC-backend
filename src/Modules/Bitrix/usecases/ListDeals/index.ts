import { BitrixDealRepository } from '../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { ListDealsByCompanyIDUseCase } from './ListDealsByCompanyIDUseCase';

const bitrixDealsRepository = BitrixDealRepository.getInstance();
const listBitrixDealsByCompanyIDUseCase = new ListDealsByCompanyIDUseCase(
  bitrixDealsRepository,
);

export { listBitrixDealsByCompanyIDUseCase };
