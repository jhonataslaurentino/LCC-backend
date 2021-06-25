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
import GetDealsResponse from '../Schemas/GetDealsResponse';
import GetDealsInput from './types/Deal/GetDealsInput';
import DealCategory from '../Schemas/DealCategory';
import PermissionRequired from '../middlewares/PermissionRequired';
import permissions from '../config/permissions';
import CreateDealCategoryInput from './types/Deal/CreateDealCategoryInput';
import CreateDealCategoryService from '../Services/deals/dealsCategories/CreateDealCategoryService';
import GetDealsCategoriesService from '../Services/deals/dealsCategories/GetDealsCategoriesService';
import DeleteDealCategoryInput from './types/Deal/DeleteDealCategoryInput';
import DeleteDealCategoryService from '../Services/deals/dealsCategories/DeleteDealCategoryService';
import BitrixDealFieldItem from '../Schemas/BitrixDealFieldItem';
import GetBitrixDealFieldItemsInput from './types/Deal/GetBitrixDealFieldItemsInput';
import GetBitrixDealFieldItemsService from '../Services/deals/dealsCategories/GetBitrixDealFieldItemsService';
import SwitchDealCategoryVisibilityInput from './types/Deal/SwitchDealCategoryVisibilityInput';
import SwitchDealCategoryVisibilityService from '../Services/deals/dealsCategories/SwitchDealCategoryVisibilityService';
import GetDealsUpdatedInput from './types/Deal/GetDealsUpdatedInput';
import DealCategoryStage from '../Schemas/DealCategoryStage';
import GetDealCategoryStageInput from './types/Deal/GetDealCategoryStagesInput';
import GetDealCategoryStagesService from '../Services/deals/dealsCategories/GetDealCategoryStagesService';
import { listBitrixDealsByCompanyIDUseCase } from '../Modules/Bitrix/useCases/ListDeals';
import BitrixDealCategory from '../Modules/Bitrix/schemas/BitrixDealCategory';
import { listBitrixDealsCategoriesUseCase } from '../Modules/Bitrix/useCases/ListBitrixDealsCategories';
import { BitrixDeal } from '../Modules/Bitrix/schemas/BitrixDeal';
import { UpdateBitrixDealCommentsInput } from './types/Deal/UpdateBitrixDealCommentsInput';
import { updateDealCommentUseCase } from '../Modules/Bitrix/useCases/UpdateDealComments';
import BitrixDealField from '../Modules/Bitrix/schemas/BitrixDealField';
import { getBitrixDealFieldsUseCase } from '../Modules/Bitrix/useCases/GetBitrixDealFields';
import ListDealTimelineCommentsInput from './types/Deal/ListDealTimelineCommentsInput';
import { listDealCommentsTimelineUseCase } from '../Modules/Bitrix/useCases/ListDealCommentsTimeline';
import { ListDealCommentsTimeLineSchema } from '../Modules/Bitrix/useCases/ListDealCommentsTimeline/ListDealCommentsTimeLineSchema';

@Resolver()
class DealsResolver {
  // TODO: update it
  @Query(() => GetDealsResponse, { nullable: true })
  @UseMiddleware(AuthenticatedChecker)
  async getDeals(
    @Ctx()
    ctx: ContextData,
    @Arg('data')
    { page }: GetDealsInput,
  ): Promise<GetDealsResponse> {
    const { id: companyID } = ctx;
    const dealsGathered = await listBitrixDealsByCompanyIDUseCase.execute({
      page,
      companyID,
      dealCategoryID: String(1),
      bitrixDealCategoryID: '1',
    });
    return dealsGathered;
  }

  // TODO: change it on frontend and backend
  @Query(() => GetDealsResponse, {
    nullable: true,
    description: 'The company should use this resolver to get your deals',
  })
  @UseMiddleware(AuthenticatedChecker)
  async getDealsUpdated(
    @Ctx()
    ctx: ContextData,
    @Arg('data')
    { dealCategoryID, page }: GetDealsUpdatedInput,
  ): Promise<GetDealsResponse> {
    const { id: companyID } = ctx;

    const deals = await listBitrixDealsByCompanyIDUseCase.execute({
      companyID,
      dealCategoryID,
      page,
    });
    return deals;
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
    const dealsGathered = await listBitrixDealsByCompanyIDUseCase.execute({
      page,
      companyID,
      dealCategoryID: String(5),
      bitrixDealCategoryID: '5',
    });
    return dealsGathered;
  }

  @Query(() => [BitrixDealCategory])
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async getBitrixDealsCategories(): Promise<BitrixDealCategory[]> {
    const bitrixDealsCategories = await listBitrixDealsCategoriesUseCase.execute();
    return bitrixDealsCategories;
  }

  @Mutation(() => DealCategory)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async createDealCategory(
    @Arg('data')
    {
      bitrix_id,
      isVisible,
      name,
      bitrixProductsField,
      isInDevelopment,
      url,
    }: CreateDealCategoryInput,
  ): Promise<DealCategory> {
    const createDealCategoryService = new CreateDealCategoryService();
    const dealCategory = await createDealCategoryService.execute({
      bitrix_id,
      isVisible,
      name,
      bitrixProductsField,
      isInDevelopment,
      url,
    });
    return dealCategory;
  }

  @Mutation(() => DealCategory)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
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
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async getBitrixDealFields(): Promise<BitrixDealField[]> {
    const fields = await getBitrixDealFieldsUseCase.execute();
    return fields;
  }

  @Query(() => [DealCategoryStage], { nullable: true })
  async getDealCategoryStages(
    @Arg('data')
    { dealCategoryID }: GetDealCategoryStageInput,
  ): Promise<DealCategoryStage[]> {
    const getDealCategoryStagesService = new GetDealCategoryStagesService();
    const dealCategoryStages = await getDealCategoryStagesService.execute({
      dealCategoryID,
    });
    return dealCategoryStages;
  }

  @Query(() => [BitrixDealFieldItem], { nullable: true })
  async getBitrixDealFieldItems(
    @Arg('data')
    { dealFieldKey }: GetBitrixDealFieldItemsInput,
  ): Promise<BitrixDealFieldItem[]> {
    const getBitrixDealFieldItemsService = new GetBitrixDealFieldItemsService();
    const bitrixDealFieldItems = await getBitrixDealFieldItemsService.execute({
      dealFieldKey,
    });
    return bitrixDealFieldItems;
  }

  @Mutation(() => DealCategory)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async switchDealCategoryVisibility(
    @Arg('data')
    { dealCategoryID }: SwitchDealCategoryVisibilityInput,
  ): Promise<DealCategory> {
    const switchDealCategoryVisibilityService = new SwitchDealCategoryVisibilityService();
    const dealCategory = await switchDealCategoryVisibilityService.execute({
      dealCategoryID,
    });
    return dealCategory;
  }

  @Mutation(() => BitrixDeal)
  @UseMiddleware(AuthenticatedChecker)
  async updateDealComment(
    @Ctx()
    ctx: ContextData,
    @Arg('data')
    { comment, id }: UpdateBitrixDealCommentsInput,
  ): Promise<BitrixDeal> {
    const { id: companyID } = ctx;
    const updatedDeal = await updateDealCommentUseCase.execute({
      comment,
      id,
      companyID,
    });
    return updatedDeal;
  }

  @Query(() => ListDealCommentsTimeLineSchema)
  @UseMiddleware(AuthenticatedChecker)
  async listTimeLineComments(
    @Ctx()
    ctx: ContextData,
    @Arg('data')
    { id }: ListDealTimelineCommentsInput,
  ): Promise<ListDealCommentsTimeLineSchema> {
    const { id: companyID } = ctx;
    const comments = await listDealCommentsTimelineUseCase.execute({
      companyID,
      id,
    });
    return comments;
  }
}

export default DealsResolver;
