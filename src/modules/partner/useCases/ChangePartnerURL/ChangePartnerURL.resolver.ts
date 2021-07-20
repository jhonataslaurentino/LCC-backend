import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { changePartnerURLUseCase } from '.';
import permissions from '../../../../config/permissions';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import { Partner } from '../../Schemas/Partner';
import { ChangePartnerURLInput } from './ChangePartnerURLInput';

@Resolver()
class ChangePartnerURLResolver {
  @Mutation(() => Partner)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async changePartnerURL(
    @Arg('data')
    data: ChangePartnerURLInput,
  ): Promise<Partner> {
    const changedPartner = await changePartnerURLUseCase.execute(data);
    return changedPartner;
  }
}

export { ChangePartnerURLResolver };
