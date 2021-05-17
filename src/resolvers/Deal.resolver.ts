import {
  Resolver,
  Query,
  Arg,
  Ctx,
  UseMiddleware,
  Mutation,
} from 'type-graphql';
import { ContextData } from '../Context/context';
import AuthenticatedChecker from '../middlewares/AuthenticatedChecker';
import BitrixDealCategory from '../Schemas/BitrixDealCategory';
import GetDealsResponse from '../Schemas/GetDealsResponse';
import GetDealService from '../Services/GetDealService';
import GetDealsService from '../Services/GetDealsService';
import GetVehicularDealsService from '../Services/GetVehicularDealsService';
import GetDealInput from './types/Deal/GetDealInput';
import GetDealsInput from './types/Deal/GetDealsInput';
import BitrixDeal from '../Schemas/BitrixDeal';
import DealCategory from '../Schemas/DealCategory';
import PermissionRequired from '../middlewares/PermissionRequired';
import permissions from '../config/permissions';
import CreateDealCategoryInput from './types/Deal/CreateDealCategoryInput';
import CreateDealCategoryService from '../Services/deals/dealsCategories/CreateDealCategoryService';
import DealType from '../Schemas/DealType';
import CreateDealTypeInput from './types/Deal/CreateDealTypeInput';
import CreateDealTypeService from '../Services/deals/dealsCategories/CreateDealTypeService';
import GetBitrixDealsCategoriesService from '../Services/deals/dealsCategories/GetBitrixDealsCategoriesService';
import GetDealsCategoriesService from '../Services/deals/dealsCategories/GetDealsCategoriesService';

@Resolver()
class DealsResolver {
  @Query(() => BitrixDeal, { nullable: true })
  @UseMiddleware(AuthenticatedChecker)
  async getDeal(
    @Ctx()
    ctx: ContextData,
    @Arg('data')
    { dealID }: GetDealInput,
  ): Promise<BitrixDeal> {
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

  @Query(() => [BitrixDealCategory])
  @UseMiddleware(AuthenticatedChecker, PermissionRequired(permissions.admin))
  async getBitrixDealsCategories(): Promise<BitrixDealCategory[]> {
    const getBitrixDealsCategoriesService = new GetBitrixDealsCategoriesService();
    const bitrixDealsCategories = await getBitrixDealsCategoriesService.execute();
    return bitrixDealsCategories;
  }

  @Mutation(() => DealCategory)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired(permissions.admin))
  async createDealCategory(
    @Arg('data')
    { bitrix_id, isVisible, name }: CreateDealCategoryInput,
  ): Promise<DealCategory> {
    const createDealCategoryService = new CreateDealCategoryService();
    const dealCategory = await createDealCategoryService.execute({
      bitrix_id,
      isVisible,
      name,
    });
    return dealCategory;
  }

  @Query(() => [DealCategory], { nullable: true })
  async getDealsCategories(): Promise<DealCategory[]> {
    const getDealsCategoriesService = new GetDealsCategoriesService();
    const dealsCategories = await getDealsCategoriesService.execute();
    return dealsCategories;
  }

  @Mutation(() => DealType)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired(permissions.admin))
  async createDealType(
    @Arg('data')
    {
      bitrix_id,
      dealCategoryID,
      name,
      creditType,
      simulationRate,
    }: CreateDealTypeInput,
  ): Promise<DealType> {
    const createDealTypeService = new CreateDealTypeService();
    const dealType = await createDealTypeService.execute({
      bitrix_id,
      creditType,
      simulationRate,
      name,
      dealCategoryID,
    });
    return dealType;
  }
}

export default DealsResolver;
