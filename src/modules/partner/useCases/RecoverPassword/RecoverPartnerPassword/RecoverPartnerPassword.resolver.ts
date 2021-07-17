import { Arg, Mutation, Resolver } from 'type-graphql';
import { recoverPartnerPasswordUseCase } from '.';
import { Partner } from '../../../Schemas/Partner';
import { RecoverPartnerPasswordInput } from './RecoverPartnerPasswordInput';

@Resolver()
class RecoverPartnerPasswordResolver {
  @Mutation(() => Partner)
  async recoverPartnerPassword(
    @Arg('data', { validate: true })
    data: RecoverPartnerPasswordInput,
  ): Promise<Partner> {
    const changedPartner = await recoverPartnerPasswordUseCase.execute(data);
    return changedPartner;
  }
}

export { RecoverPartnerPasswordResolver };
