import { Arg, Mutation, Resolver } from 'type-graphql';
import { authenticateCompanyUseCase } from '..';
import { AuthenticationCompanyInput } from './AuthenticateCompanyInput';
import { AuthenticateCompanyOutput } from './AuthenticateCompanyOutput';

@Resolver()
class AuthenticateCompanyResolver {
  @Mutation(() => AuthenticateCompanyOutput)
  async login(
    @Arg('data')
    { email, password }: AuthenticationCompanyInput,
  ): Promise<AuthenticateCompanyOutput> {
    const emailInLowerCase = email.toLowerCase();

    const data = await authenticateCompanyUseCase.execute({
      email: emailInLowerCase,
      password,
    });
    data.company.password = '';
    return data;
  }
}

export { AuthenticateCompanyResolver };
