import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { changePartnerPasswordUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { Partner } from '../../Schemas/Partner';
import { ChangePartnerPasswordInput } from './ChangePartnerPasswordInput';

@Resolver()
class ChangePartnerPasswordResolver {
  @Mutation(() => Partner, {
    description:
      'Change the partner password mutation. The partner must be authenticated to change it password',
  })
  @UseMiddleware(AuthenticatedChecker)
  async changePartnerPassword(
    @Ctx()
    context: ContextData,
    @Arg('data', { validate: true })
    { newPassword, oldPassword }: ChangePartnerPasswordInput,
  ): Promise<Partner> {
    const { id: partnerID } = context;
    const partner = await changePartnerPasswordUseCase.execute({
      newPassword,
      oldPassword,
      partnerID,
    });
    return partner;
  }
}

export { ChangePartnerPasswordResolver };
