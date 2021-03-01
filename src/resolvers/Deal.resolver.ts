import { Resolver, Query, Arg } from 'type-graphql';
import Deal from '../Schemas/Deal';
import GetDealsResponse from '../Schemas/GetDealsResponse';
import GetDealService from '../Services/GetDealService';
import GetDealsService from '../Services/GetDealsService';
import GetVehicularDealsService from '../Services/GetVehicularDealsService';
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

  @Query(() => GetDealsResponse, { nullable: true })
  async getVehicularDeals(
    @Arg('data')
    { companyID, page }: GetDealsInput,
  ): Promise<GetDealsResponse> {
    const getVehicularDealsService = new GetVehicularDealsService();
    const dealsGathered = await getVehicularDealsService.execute({
      page,
      companyID,
    });
    return dealsGathered;
  }
}

export default DealsResolver;
