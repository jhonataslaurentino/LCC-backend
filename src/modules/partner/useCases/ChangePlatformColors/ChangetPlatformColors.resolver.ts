import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { changePlatformColorsUseCase } from '.';
import permissions from '../../../../config/permissions';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { PartnerPermissionRequired } from '../../middlewares/PartnerPermissionRequired';
import { PartnerStyleSchema } from '../GetPartnerStyle/PartnerStyleSchema';
import { ChangePlatformColorsInput } from './ChangePlatformColorsInput';

@Resolver()
class ChangePlatformColorsResolver {
  @Mutation(() => PartnerStyleSchema)
  @UseMiddleware(
    AuthenticatedChecker,
    PartnerPermissionRequired([permissions.changePlatformColorsAndLogo]),
  )
  async changePlatformColors(
    @Ctx()
    context: ContextData,
    @Arg('data')
    { primaryColor, secondaryColor }: ChangePlatformColorsInput,
  ): Promise<PartnerStyleSchema> {
    const { id: partnerID } = context;
    const response = await changePlatformColorsUseCase.execute({
      partnerID,
      primaryColor,
      secondaryColor,
    });
    return response;
  }
}

export { ChangePlatformColorsResolver };
