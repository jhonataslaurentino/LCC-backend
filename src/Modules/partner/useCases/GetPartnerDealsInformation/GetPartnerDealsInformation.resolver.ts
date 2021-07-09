import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { getPartnerDealsInformationUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { GetPartnerDealsInformationSchema } from './GetPartnerDealsInformationSchema';

@Resolver()
class GetPartnerDealsInformationResolver {
  @Query(() => GetPartnerDealsInformationSchema)
  @UseMiddleware(AuthenticatedChecker)
  async getPartnerDealsInformation(
    @Ctx()
    context: ContextData,
  ): Promise<GetPartnerDealsInformationSchema> {
    const { id: partnerID } = context;
    const partnerDealsInformation = await getPartnerDealsInformationUseCase.execute(
      partnerID,
    );
    return partnerDealsInformation;
  }
}

export { GetPartnerDealsInformationResolver };
