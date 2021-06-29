import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { changePartnerInformationUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { Partner } from '../../Schemas/Partner';
import { ChangePartnerInformationInput } from './ChangePartnerInformationInput';

@Resolver()
class ChangePartnerInformationResolver {
  @Mutation(() => Partner, {
    description: 'Change partner information mutation',
  })
  @UseMiddleware(AuthenticatedChecker)
  async changePartnerInformation(
    @Ctx()
    context: ContextData,
    @Arg('data')
    { companyName, name, password, phone }: ChangePartnerInformationInput,
  ): Promise<Partner> {
    const { id: partnerID } = context;
    const partner = await changePartnerInformationUseCase.execute({
      companyName,
      name,
      partnerID,
      password,
      phone,
    });
    return partner;
  }
}

export { ChangePartnerInformationResolver };
