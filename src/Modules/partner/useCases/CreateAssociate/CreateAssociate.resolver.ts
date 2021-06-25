import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { createAssociateUseCase } from '.';
import permissions from '../../../../config/permissions';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import PermissionRequired from '../../../../middlewares/PermissionRequired';
import { Partner } from '../../Schemas/Partner';
import { CreateAssociateInput } from './CreateAssociateInput';

@Resolver()
class CreateAssociateResolver {
  @Mutation(() => Partner, {
    description:
      'Create a associate partner. You should be a partner to create your associates',
  })
  @UseMiddleware(
    AuthenticatedChecker,
    PermissionRequired([permissions.createAssociatedUser]),
  )
  async createPartnerAssociate(
    @Ctx()
    contextData: ContextData,
    @Arg('data')
    { cpf_cnpj, email, name, password, phone }: CreateAssociateInput,
  ): Promise<Partner> {
    const { id: partnerCreatorID } = contextData;
    const partner = await createAssociateUseCase.execute({
      cpf_cnpj,
      email,
      name,
      partnerCreatorID,
      password,
      phone,
    });
    return partner;
  }
}

export { CreateAssociateResolver };
