import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import permissions from '../config/permissions';
import AuthenticatedChecker from '../middlewares/AuthenticatedChecker';
import PermissionRequired from '../middlewares/PermissionRequired';
import DealProduct from '../Schemas/DealProduct';
import EditDealProductService from '../Services/deals/dealsCategories/EditDealProductService';
import GetDealsProductsService from '../Services/deals/dealsCategories/GetDealsProductsService';
import DeleteDealProductService from '../Services/deals/dealsCategories/DeleteDealProductService';
import DeleteDealProductInput from './types/Deal/DeleteDealProductInput';
import EditDealProductInput from './types/Deal/EditDealProductInput';
import CreateDealProductInput from './types/Deal/CreateDealProductInput';
import CreateDealProductService from '../Services/deals/dealsCategories/CreateDealProductService';

@Resolver()
class DealProductResolver {
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

  @Query(() => [DealProduct], { nullable: true })
  async getDealsProducts(): Promise<DealProduct[]> {
    const getDealsProductsService = new GetDealsProductsService();
    const dealProducts = await getDealsProductsService.execute();
    return dealProducts;
  }

  @Mutation(() => DealProduct)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired(permissions.admin))
  async editDealProduct(
    @Arg('data')
    { averageRate, competitiveRate, name, id }: EditDealProductInput,
  ): Promise<DealProduct> {
    const editDealProductService = new EditDealProductService();
    const dealProduct = await editDealProductService.execute({
      id,
      name,
      competitiveRate,
      averageRate,
    });
    return dealProduct;
  }

  @Mutation(() => DealProduct)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired(permissions.admin))
  async deleteDealProduct(
    @Arg('data')
    { id }: DeleteDealProductInput,
  ): Promise<DealProduct> {
    const deleteDealProductService = new DeleteDealProductService();
    const dealProduct = await deleteDealProductService.execute({
      id,
    });
    return dealProduct;
  }
}

export default DealProductResolver;
