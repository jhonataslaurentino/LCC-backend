import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { switchDealCategoryVisibilityUseCase } from '.';
import permissions from '../../../../config/permissions';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import { DealCategory } from '../../schemas/DealCategory';
import SwitchDealCategoryVisibilityInput from './SwitchDealCategoryVisibilityInput';

@Resolver()
class SwitchDealCategoryVisibilityResolver {
  @Mutation(() => DealCategory)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async switchDealCategoryVisibility(
    @Arg('data')
    { dealCategoryID }: SwitchDealCategoryVisibilityInput,
  ): Promise<DealCategory> {
    const changedDealCategory = await switchDealCategoryVisibilityUseCase.execute(
      dealCategoryID,
    );
    return changedDealCategory;
  }
}

export { SwitchDealCategoryVisibilityResolver };
