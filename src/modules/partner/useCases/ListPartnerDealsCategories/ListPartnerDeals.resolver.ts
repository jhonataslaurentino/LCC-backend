import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { listPartnerDealsCategoriesUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { PartnerDealCategory } from '../../Schemas/PartnerDealsCategories';

@Resolver()
class ListPartnerDealsCategoriesResolver {
  @Query(() => [PartnerDealCategory], { nullable: true })
  @UseMiddleware(AuthenticatedChecker)
  async listPartnerDealsCategories(
    @Ctx()
    context: ContextData,
  ): Promise<PartnerDealCategory[]> {
    const { id: partnerID } = context;
    const partnerDealCategories = await listPartnerDealsCategoriesUseCase.execute(
      partnerID,
    );
    return partnerDealCategories;
  }
}

export { ListPartnerDealsCategoriesResolver };
