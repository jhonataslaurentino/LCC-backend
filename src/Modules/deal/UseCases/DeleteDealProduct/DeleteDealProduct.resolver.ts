import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { deleteDealProductUseCase } from '.';
import permissions from '../../../../config/permissions';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import { DealProduct } from '../../schemas/DealProduct';
import DeleteDealProductInput from './DeleteDealProductInput';

@Resolver()
class DeleteDealProductResolver {
  @Mutation(() => DealProduct)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  @Mutation(() => DealProduct)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async deleteDealProduct(
    @Arg('data')
    { id }: DeleteDealProductInput,
  ): Promise<DealProduct> {
    const dealProduct = await deleteDealProductUseCase.execute(id);
    return dealProduct;
  }
}

export { DeleteDealProductResolver };
