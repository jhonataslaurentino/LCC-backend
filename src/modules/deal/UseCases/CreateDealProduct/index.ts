import { DealProductRepository } from '../../repositories/implementations/DealProduct';
import { CreateDealProductUseCase } from './CreateDealProductUseCase';

const dealProductsRepository = new DealProductRepository();
const createDealProductUseCase = new CreateDealProductUseCase(
  dealProductsRepository,
);

export { createDealProductUseCase };
