import { Arg, Query, Resolver } from 'type-graphql';
import { getPartnerInformationUseCase } from '.';
import { GetPartnerInformationInput } from './GetPartnerInformationInput';
import { PartnerInformationSchema } from './PartnerInformationSchema';

@Resolver()
class GetPartnerInformationResolver {
  @Query(() => PartnerInformationSchema, {
    description: 'Get partner information query',
  })
  async getPartnerInformation(
    @Arg('data')
    { partnerID }: GetPartnerInformationInput,
  ): Promise<PartnerInformationSchema> {
    const information = await getPartnerInformationUseCase.execute(partnerID);
    return information;
  }
}

export { GetPartnerInformationResolver };
