import { Arg, Resolver, Query } from 'type-graphql';
import { getPartnerStyleUseCase } from '.';
import { GetPartnerStyleInput } from './GetPartnerStyleInput';
import { PartnerStyleSchema } from './PartnerStyleSchema';

@Resolver()
class GetPartnerStyleResolver {
  @Query(() => PartnerStyleSchema)
  async getPartnerStyle(
    @Arg('data')
    { partnerID }: GetPartnerStyleInput,
  ): Promise<PartnerStyleSchema> {
    const styles = await getPartnerStyleUseCase.execute({
      partnerID,
    });
    return styles;
  }
}

export { GetPartnerStyleResolver };
