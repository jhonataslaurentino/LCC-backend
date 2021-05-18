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
import DealProduct from '../Schemas/DealProduct';
import CreateDealProductService from '../Services/deals/dealsCategories/CreateDealProductService';
import GetBitrixDealsCategoriesService from '../Services/deals/dealsCategories/GetBitrixDealsCategoriesService';
import GetDealsCategoriesService from '../Services/deals/dealsCategories/GetDealsCategoriesService';
import CreateDealProductInput from './types/Deal/CreateDealProductInput';
import GetBitrixDealFieldsService from '../Services/deals/dealsCategories/GetBitrixDealFieldsService';
import BitrixDealField from '../Schemas/BitrixDealField';
import DeleteDealCategoryInput from './types/Deal/DeleteDealCategoryInput';
import DeleteDealCategoryService from '../Services/deals/dealsCategories/DeleteDealCategoryService';

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
    {
      bitrix_id,
      isVisible,
      name,
      bitrixProductsField,
    }: CreateDealCategoryInput,
  ): Promise<DealCategory> {
    const createDealCategoryService = new CreateDealCategoryService();
    const dealCategory = await createDealCategoryService.execute({
      bitrix_id,
      isVisible,
      name,
      bitrixProductsField,
    });
    return dealCategory;
  }

  @Mutation(() => DealCategory)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired(permissions.admin))
  async deleteDealCategory(
    @Arg('data')
    { id }: DeleteDealCategoryInput,
  ): Promise<DealCategory> {
    const deleteDealCategoryService = new DeleteDealCategoryService();
    const dealCategory = await deleteDealCategoryService.execute({
      dealCategoryID: id,
    });
    return dealCategory;
  }

  @Query(() => [DealCategory], { nullable: true })
  async getDealsCategories(): Promise<DealCategory[]> {
    const getDealsCategoriesService = new GetDealsCategoriesService();
    const dealsCategories = await getDealsCategoriesService.execute();
    return dealsCategories;
  }

  @Query(() => [BitrixDealField], { nullable: true })
  @UseMiddleware(AuthenticatedChecker, PermissionRequired(permissions.admin))
  async getBitrixDealFields(): Promise<BitrixDealField[]> {
    const getBitrixDealFieldsService = new GetBitrixDealFieldsService();
    const fields = await getBitrixDealFieldsService.execute();
    return fields;
  }

  @Mutation(() => DealProduct)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired(permissions.admin))
  async createDealProduct(
    @Arg('data')
    {
      bitrix_id,
      dealCategoryID,
      name,
      averageRate,
      competitiveRate,
    }: CreateDealProductInput,
  ): Promise<DealProduct> {
    const createDealProductService = new CreateDealProductService();
    const dealType = await createDealProductService.execute({
      bitrix_id,
      averageRate,
      competitiveRate,
      name,
      dealCategoryID,
    });
    return dealType;
  }
}

export default DealsResolver;
