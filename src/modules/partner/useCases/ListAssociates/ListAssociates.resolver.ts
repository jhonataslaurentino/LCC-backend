import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { listPartnerAssociates } from '.';
import permissions from '../../../../config/permissions';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { PartnerPermissionRequired } from '../../middlewares/PartnerPermissionRequired';
import { Partner } from '../../Schemas/Partner';

@Resolver()
class ListAssociatesResolver {
  @Query(() => [Partner], {
    description:
      "List the partner's associate. To use this query, you should use the authentication token",
    nullable: true,
  })
  @UseMiddleware(
    AuthenticatedChecker,
    PartnerPermissionRequired([permissions.visualizeAssociatedUsers]),
  )
  async listAssociates(
    @Ctx()
    context: ContextData,
  ): Promise<Partner[]> {
    const { id: partnerID } = context;
    const partners = await listPartnerAssociates.execute(partnerID);
    return partners;
  }
}

export { ListAssociatesResolver };
