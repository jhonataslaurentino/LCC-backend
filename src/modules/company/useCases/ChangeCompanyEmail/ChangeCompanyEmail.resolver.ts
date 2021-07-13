import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { changeCompanyEmailUseCase } from '.';
import permissions from '../../../../config/permissions';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import Company from '../../schemas/Company';
import { ChangeCompanyEmailInput } from './ChangeCompanyEmailInput';

@Resolver()
class ChangeCompanyEmailResolver {
  @Mutation(() => Company, {
    description:
      'You can use this mutation to change a company email. To do it, you should be an administrator user',
  })
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async changeCompanyEmail(
    @Arg('data')
    { companyID, newEmail }: ChangeCompanyEmailInput,
  ): Promise<Company> {
    const company = await changeCompanyEmailUseCase.execute({
      companyID,
      newEmail,
    });
    return company;
  }
}

export { ChangeCompanyEmailResolver };
