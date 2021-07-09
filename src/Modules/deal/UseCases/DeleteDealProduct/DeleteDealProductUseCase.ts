import { IDealProductRepository } from '../../repositories/IDealProductRepository';
import { DealProduct } from '../../schemas/DealProduct';

class DeleteDealProductUseCase {
  constructor(private dealProductsRepository: IDealProductRepository) {}

  async execute(dealProductID: string): Promise<DealProduct> {
    const deletedDealProduct = await this.dealProductsRepository.delete(
      dealProductID,
    );
    return deletedDealProduct;
  }
}

export { DeleteDealProductUseCase };
