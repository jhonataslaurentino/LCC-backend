import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { editDealProductUseCase } from '.';
import permissions from '../../../../config/permissions';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import { DealProduct } from '../../schemas/DealProduct';
import EditDealProductInput from './EditDealProductInput';

@Resolver()
class EditDealProductResolver {
  @Mutation(() => DealProduct)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async editDealProduct(
    @Arg('data')
    data: EditDealProductInput,
  ): Promise<DealProduct> {
    const changedDealProduct = await editDealProductUseCase.execute(data);
    return changedDealProduct;
  }
}

export { EditDealProductResolver };
