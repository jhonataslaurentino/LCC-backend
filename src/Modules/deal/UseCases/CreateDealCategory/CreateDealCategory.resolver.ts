import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { createDealCategoryUseCase } from '.';
import permissions from '../../../../config/permissions';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import { DealCategory } from '../../schemas/DealCategory';
import CreateDealCategoryInput from './CreateDealCategoryInput';

@Resolver()
class CreateDealCategoryResolver {
  @Mutation(() => DealCategory, {
    description: 'Create a deal category mutation',
  })
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async createDealCategory(
    @Arg('data')
    data: CreateDealCategoryInput,
  ): Promise<DealCategory> {
    const createdDealCategory = await createDealCategoryUseCase.execute(data);
    return createdDealCategory;
  }
}

export { CreateDealCategoryResolver };
