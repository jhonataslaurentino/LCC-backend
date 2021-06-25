import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { changePlatformColorsUseCase } from '.';
import permissions from '../../../../config/permissions';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import { PartnerStyleSchema } from '../GetPartnerStyle/PartnerStyleSchema';
import { ChangePlatformColorsInput } from './ChangePlatformColorsInput';

@Resolver()
class ChangePlatformColorsResolver {
  @Mutation(() => PartnerStyleSchema)
  @UseMiddleware(
    AuthenticatedChecker,
    PermissionRequired([permissions.changePlatformColorsAndLogo]),
  )
  async changePlatformColors(
    @Ctx()
    context: ContextData,
    @Arg('args')
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
