import { Resolver, Query } from 'type-graphql';
import { listDealCategoriesUseCase } from '.';
import { DealCategory } from '../../schemas/DealCategory';

@Resolver()
class ListDealCategoriesResolver {
  @Query(() => [DealCategory], { nullable: true })
  async getDealsCategories(): Promise<DealCategory[]> {
    const dealsCategories = await listDealCategoriesUseCase.execute();
    return dealsCategories;
  }
}

export { ListDealCategoriesResolver };
