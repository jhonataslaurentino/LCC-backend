import { Resolver, Query, Arg, Authorized } from 'type-graphql';
import Deal from '../Schemas/Deal';
import GetDealsResponse from '../Schemas/GetDealsResponse';
import GetDealService from '../Services/GetDealService';
import GetDealsService from '../Services/GetDealsService';
import GetDealInput from './types/Deal/GetDealInput';
import GetDealsInput from './types/Deal/GetDealsInput';

@Resolver()
class DealsResolver {
  @Query(() => Deal, { nullable: true })
  async getDeal(
    @Arg('data')
    { dealID }: GetDealInput,
  ): Promise<Deal> {
    const getDealService = new GetDealService();
    const deal = getDealService.execute({
      id: dealID,
    });
    return deal;
  }

  @Authorized()
  @Query(() => GetDealsResponse, { nullable: true })
  async getDeals(
    @Arg('data')
    { companyID, page }: GetDealsInput,
  ): Promise<GetDealsResponse> {
    const getDealsService = new GetDealsService();
    const dealsGathered = await getDealsService.execute({
      page,
      companyID,
    });
    return dealsGathered;
  }
}

export default DealsResolver;
