import { Arg, Query, Resolver } from 'type-graphql';
import { getPlatformLogoUseCase } from '.';
import { GetPlatformLogoInput } from './GetPlatformLogoInput';

@Resolver()
class GetPlatformLogoResolver {
  @Query(() => String, { description: 'Get partner platform logo query' })
  async getPartnerPlatformLogo(
    @Arg('data')
    { partnerID }: GetPlatformLogoInput,
  ): Promise<string> {
    const logo = await getPlatformLogoUseCase.execute(partnerID);
    return logo;
  }
}

export { GetPlatformLogoResolver };
