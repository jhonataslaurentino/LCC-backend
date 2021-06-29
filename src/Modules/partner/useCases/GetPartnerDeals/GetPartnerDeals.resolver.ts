import { Resolver, Query, UseMiddleware, Arg, Ctx } from 'type-graphql';
import { getPartnerDealsUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import { GetPartnerDealsInput } from './GetPartnerDealsInput';
import { GetPartnerDealsSchema } from './GetPartnerDealsSchema';

@Resolver()
class GetPartnerDealsResolver {
  @Query(() => GetPartnerDealsSchema, { description: "Get partner's deals" })
  async getPartnerDeals(
    @Ctx()
    contextData: ContextData,
    @Arg('data')
    { page, dealCategoryID }: GetPartnerDealsInput,
  ): Promise<GetPartnerDealsSchema> {
    const { id: partnerID } = contextData;
    const response = await getPartnerDealsUseCase.execute({
      categoryID: Number(dealCategoryID),
      partnerID,
      page,
    });
    return response;
  }
}

export { GetPartnerDealsResolver };
