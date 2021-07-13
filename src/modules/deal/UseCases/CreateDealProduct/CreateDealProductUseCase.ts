import {
  ICreateDealProductData,
  IDealProductRepository,
} from '../../repositories/IDealProductRepository';
import { DealProduct } from '../../schemas/DealProduct';

class CreateDealProductUseCase {
  constructor(private dealProductsRepository: IDealProductRepository) {}

  async execute(data: ICreateDealProductData): Promise<DealProduct> {
    const createdDealProduct = await this.dealProductsRepository.create(data);
    return createdDealProduct;
  }
}

export { CreateDealProductUseCase };
