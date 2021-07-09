import { IDealProductRepository } from '../../repositories/IDealProductRepository';
import { DealProduct } from '../../schemas/DealProduct';

class GetDealProductsUseCase {
  constructor(private dealProductsRepository: IDealProductRepository) {}

  async execute(): Promise<DealProduct[]> {
    const dealProductsRepository = await this.dealProductsRepository.list();
    return dealProductsRepository;
  }
}

export { GetDealProductsUseCase };
