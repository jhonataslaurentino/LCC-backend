import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { addPartnerDealCategoryUseCase } from '.';
import permissions from '../../../../config/permissions';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { PartnerPermissionRequired } from '../../middlewares/PartnerPermissionRequired';
import { PartnerDealCategory } from '../../Schemas/PartnerDealsCategories';
import { AddPartnerDealCategoryInput } from './AddPartnerDealCategoryInput';

@Resolver()
class AddPartnerDealCategoryResolver {
  @Mutation(() => PartnerDealCategory, {
    description:
      'Add a deal category to the partner. You should be a partner master and be authenticated.',
  })
  @UseMiddleware(
    AuthenticatedChecker,
    PartnerPermissionRequired([permissions.addPartnerDealCategory]),
  )
  async addPartnerDealCategory(
    @Ctx()
    context: ContextData,
    @Arg('data')
    { dealCategoryID }: AddPartnerDealCategoryInput,
  ): Promise<PartnerDealCategory> {
    const { id: partnerID } = context;
    const dealCategory = await addPartnerDealCategoryUseCase.execute({
      dealCategoryID,
      partnerID,
    });
    return dealCategory;
  }
}

export { AddPartnerDealCategoryResolver };
