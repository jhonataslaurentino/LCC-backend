import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { createAssociateUseCase } from '.';
import permissions from '../../../../config/permissions';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { PartnerPermissionRequired } from '../../middlewares/PartnerPermissionRequired';
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
    PartnerPermissionRequired([permissions.createAssociatedUser]),
  )
  async createPartnerAssociate(
    @Ctx()
    contextData: ContextData,
    @Arg('data')
    {
      cpf_cnpj,
      email,
      name,
      password,
      phone,
      companyName,
    }: CreateAssociateInput,
  ): Promise<Partner> {
    const { id: partnerCreatorID } = contextData;
    const partner = await createAssociateUseCase.execute({
      companyName,
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
