import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { listPartnersUseCase } from '.';
import permissions from '../../../../config/permissions';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import { Partner } from '../../Schemas/Partner';

@Resolver()
class ListPartnersResolver {
  @Query(() => [Partner], { nullable: true })
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async listPartners(): Promise<Partner[]> {
    const partners = await listPartnersUseCase.execute();
    return partners;
  }
}

export { ListPartnersResolver };
