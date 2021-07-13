import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { getPartnerUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { Partner } from '../../Schemas/Partner';

@Resolver()
class GetPartnerResolver {
  @Query(() => Partner, {
    description:
      'Query a partner. You should pass a bearer authorization in the header body',
    nullable: true,
  })
  @UseMiddleware(AuthenticatedChecker)
  async getPartner(
    @Ctx()
    context: ContextData,
  ): Promise<Partner> {
    const { id: partnerID } = context;
    const partner = await getPartnerUseCase.execute(partnerID);
    return partner;
  }
}

export { GetPartnerResolver };
