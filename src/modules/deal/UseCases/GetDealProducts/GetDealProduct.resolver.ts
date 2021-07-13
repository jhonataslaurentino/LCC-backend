import { Query, Resolver } from 'type-graphql';
import { getDealProductsUseCase } from '.';
import { DealProduct } from '../../schemas/DealProduct';

@Resolver()
class GetDealProduct {
  @Query(() => [DealProduct], { nullable: true })
  async getDealsProducts(): Promise<DealProduct[]> {
    const dealProducts = await getDealProductsUseCase.execute();
    return dealProducts;
  }
}

export { GetDealProduct };
