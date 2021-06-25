import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { createPartnerUseCase } from '.';
import permissions from '../../../../config/permissions';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import { Partner } from '../../Schemas/Partner';
import { CreatePartnerInput } from './CreatePartnerInput';

@Resolver()
class CreatePartnerResolver {
  @Mutation(() => Partner)
  @UseMiddleware(AuthenticatedChecker, PermissionRequired([permissions.admin]))
  async CreatePartner(
    @Arg('data', { validate: true })
    { cpf_cnpj, email, name, password, phone, siteURL }: CreatePartnerInput,
  ): Promise<Partner> {
    const partner = await createPartnerUseCase.execute({
      cpf_cnpj,
      email,
      name,
      password,
      phone,
      siteURL,
    });
    return partner;
  }
}

export { CreatePartnerResolver };
