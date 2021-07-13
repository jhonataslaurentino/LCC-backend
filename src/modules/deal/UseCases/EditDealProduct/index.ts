import { DealProductRepository } from '../../repositories/implementations/DealProduct';
import { EditDealProductUseCase } from './EditDealProductService';

const dealProductsRepository = new DealProductRepository();
const editDealProductUseCase = new EditDealProductUseCase(
  dealProductsRepository,
);

export { editDealProductUseCase };
