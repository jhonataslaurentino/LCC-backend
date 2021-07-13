import { DealProductRepository } from '../../repositories/implementations/DealProduct';
import { GetDealProductsUseCase } from './GetDealProductsUseCase';

const dealProductsRepository = new DealProductRepository();
const getDealProductsUseCase = new GetDealProductsUseCase(
  dealProductsRepository,
);

export { getDealProductsUseCase };
