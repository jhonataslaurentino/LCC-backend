import { Resolver, Query, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { ContextData } from '../Context/context';
import AuthenticatedChecker from '../middlewares/AuthenticatedChecker';
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
  @UseMiddleware(AuthenticatedChecker)
  async getDeal(
    @Ctx()
    ctx: ContextData,
    @Arg('data')
    { dealID }: GetDealInput,
  ): Promise<Deal> {
    const { id: companyID } = ctx;
    const getDealService = new GetDealService();
    const deal = getDealService.execute({
      id: dealID,
      companyID,
    });
    return deal;
  }

  @Query(() => GetDealsResponse, { nullable: true })
  @UseMiddleware(AuthenticatedChecker)
  async getDeals(
    @Ctx()
    ctx: ContextData,
    @Arg('data')
    { page }: GetDealsInput,
  ): Promise<GetDealsResponse> {
    const { id: companyID } = ctx;
    const getDealsService = new GetDealsService();
    const dealsGathered = await getDealsService.execute({
      page,
      companyID,
    });
    return dealsGathered;
  }

  @Query(() => GetDealsResponse, { nullable: true })
  @UseMiddleware(AuthenticatedChecker)
  async getVehicularDeals(
    @Ctx()
    ctx: ContextData,
    @Arg('data')
    { page }: GetDealsInput,
  ): Promise<GetDealsResponse> {
    const { id: companyID } = ctx;
    const getVehicularDealsService = new GetVehicularDealsService();
    const dealsGathered = await getVehicularDealsService.execute({
      page,
      companyID,
    });
    return dealsGathered;
  }
}

export default DealsResolver;
