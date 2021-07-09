import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { createDealProductUseCase } from '.';
import permissions from '../../../../config/permissions';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import { DealProduct } from '../../schemas/DealProduct';
import CreateDealProductInput from './CreateDealProductInput';

@Resolver()
class CreateDealProductResolver {
  @Mutation(() => DealProduct)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async createDealProduct(
    @Arg('data')
    data: CreateDealProductInput,
  ): Promise<DealProduct> {
    const createdDealProduct = await createDealProductUseCase.execute(data);
    return createdDealProduct;
  }
}

export { CreateDealProductResolver };
