import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { deletePartnerUseCase } from '.';
import permissions from '../../../../config/permissions';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import { Partner } from '../../Schemas/Partner';
import { DeletePartnerInput } from './DeletePartnerInput';

@Resolver()
class DeletePartnerResolver {
  @Mutation(() => Partner)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async deletePartner(
    @Arg('data')
    { id }: DeletePartnerInput,
  ): Promise<Partner> {
    const deletedPartner = await deletePartnerUseCase.execute(id);
    return deletedPartner;
  }
}

export { DeletePartnerResolver };
