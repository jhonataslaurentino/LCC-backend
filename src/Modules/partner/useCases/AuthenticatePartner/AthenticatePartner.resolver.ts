import { Arg, Mutation, Resolver } from 'type-graphql';
import { authenticatePartnerUseCase } from '.';
import { AuthenticatePartnerInput } from './AuthenticatePartnerInput';
import { AuthenticatePartnerSchema } from './AuthenticatePartnerSchema';

@Resolver()
class AuthenticatePartnerResolver {
  @Mutation(() => AuthenticatePartnerSchema)
  async loginPartner(
    @Arg('data')
    { email, password }: AuthenticatePartnerInput,
  ): Promise<AuthenticatePartnerSchema> {
    const response = await authenticatePartnerUseCase.execute({
      email,
      password,
    });
    return response;
  }
}

export { AuthenticatePartnerResolver };
