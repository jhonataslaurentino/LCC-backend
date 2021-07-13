import { DealProductRepository } from '../../repositories/implementations/DealProduct';
import { DeleteDealProductUseCase } from './DeleteDealProductUseCase';

const dealProductsRepository = new DealProductRepository();
const deleteDealProductUseCase = new DeleteDealProductUseCase(
  dealProductsRepository,
);

export { deleteDealProductUseCase };
