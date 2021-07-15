import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { togglePartnerDealCategoriesUseCase } from '.';
import permissions from '../../../../config/permissions';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { PartnerPermissionRequired } from '../../middlewares/PartnerPermissionRequired';
import { PartnerDealCategory } from '../../Schemas/PartnerDealsCategories';
import { TogglePartnerDealCategoriesInput } from './TogglePartnerDealCategoriesInput';

@Resolver()
class TogglePartnerDealCategoriesResolver {
  @Mutation(() => [PartnerDealCategory], { nullable: true })
  @UseMiddleware(
    AuthenticatedChecker,
    PartnerPermissionRequired([
      permissions.deletePartnerDealCategory,
      permissions.addPartnerDealCategory,
    ]),
  )
  async togglePartnerDealCategories(
    @Ctx()
    context: ContextData,
    @Arg('data')
    { togglePartnerDealCategorySchemas }: TogglePartnerDealCategoriesInput,
  ): Promise<PartnerDealCategory[]> {
    const { id: partnerID } = context;
    const dealCategories = await togglePartnerDealCategoriesUseCase.execute({
      partnerID,
      togglePartnerDealCategorySchemas,
    });
    return dealCategories;
  }
}

export { TogglePartnerDealCategoriesResolver };
