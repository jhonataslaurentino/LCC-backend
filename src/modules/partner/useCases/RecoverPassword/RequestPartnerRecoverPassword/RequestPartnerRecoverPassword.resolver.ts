import { Arg, Mutation, Resolver } from 'type-graphql';
import { requestPartnerRecoverPasswordUseCase } from '.';
import { RequestPartnerRecoverPasswordInput } from './RequestPartnerRecoverPasswordInput';

@Resolver()
class RequestPartnerRecoverPassword {
  @Mutation(() => Boolean)
  async requestPartnerRecoverPassword(
    @Arg('data', { validate: true })
    { email }: RequestPartnerRecoverPasswordInput,
  ): Promise<boolean> {
    await requestPartnerRecoverPasswordUseCase.execute(email);
    return true;
  }
}

export { RequestPartnerRecoverPassword };
