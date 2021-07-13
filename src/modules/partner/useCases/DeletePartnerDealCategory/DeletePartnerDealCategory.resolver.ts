import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { deletePartnerDealCategoryUseCase } from '.';
import permissions from '../../../../config/permissions';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { PartnerPermissionRequired } from '../../middlewares/PartnerPermissionRequired';
import { PartnerDealCategory } from '../../Schemas/PartnerDealsCategories';
import { DeletePartnerDealCategoryInput } from './DeletePartnerDealCategoryInput';

@Resolver()
class DeletePartnerDealCategoryResolver {
  @Mutation(() => PartnerDealCategory, {
    description:
      "Delete a partner's deal category resolver. you should be a partner master and be authenticated to execute it.",
  })
  @UseMiddleware(
    AuthenticatedChecker,
    PartnerPermissionRequired([permissions.deletePartnerDealCategory]),
  )
  async deletePartnerDealCategory(
    @Ctx()
    context: ContextData,
    @Arg('data')
    { partnerDealCategoryID }: DeletePartnerDealCategoryInput,
  ): Promise<PartnerDealCategory> {
    const { id: partnerID } = context;
    const deletedPartnerDealCategory = await deletePartnerDealCategoryUseCase.execute(
      {
        partnerDealCategoryID,
        partnerID,
      },
    );
    return deletedPartnerDealCategory;
  }
}

export { DeletePartnerDealCategoryResolver };
