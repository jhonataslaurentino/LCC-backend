import { BitrixDealRepository } from '../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { ListAllCompanyDealsFromCategoryUseCase } from './ListAllCompanyDealsFromCategoryUseCase';

const bitrixDealsRepository = new BitrixDealRepository();
const listAllCompanyDealsFromCategoryUseCase = new ListAllCompanyDealsFromCategoryUseCase(
  bitrixDealsRepository,
);

export { listAllCompanyDealsFromCategoryUseCase };
