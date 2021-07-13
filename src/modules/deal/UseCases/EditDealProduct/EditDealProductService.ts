import {
  IDealProductRepository,
  IEditDealProductDTO,
} from '../../repositories/IDealProductRepository';
import { DealProduct } from '../../schemas/DealProduct';

class EditDealProductUseCase {
  constructor(private dealProductsRepository: IDealProductRepository) {}

  async execute(data: IEditDealProductDTO): Promise<DealProduct> {
    const changedDealProduct = await this.dealProductsRepository.Edit(data);
    return changedDealProduct;
  }
}

export { EditDealProductUseCase };
