import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { deleteDealCategoryUseCase } from '.';
import permissions from '../../../../config/permissions';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import { DealCategory } from '../../schemas/DealCategory';
import DeleteDealCategoryInput from './DeleteDealCategoryInput';

@Resolver()
class DeleteDealCategoryResolver {
  @Mutation(() => DealCategory)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async deleteDealCategory(
    @Arg('data')
    { id }: DeleteDealCategoryInput,
  ): Promise<DealCategory> {
    const deletedDealCategory = deleteDealCategoryUseCase.execute(id);
    return deletedDealCategory;
  }
}

export { DeleteDealCategoryResolver };
