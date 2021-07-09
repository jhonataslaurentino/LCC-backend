import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { listPartnerContactsUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { BitrixContact } from '../../../Bitrix/schemas/BitrixContact';
import { ListPartnerContactsInput } from './ListPartnerContactsInput';
import { ListPartnerContactsSchema } from './ListPartnerContactsSchema';

@Resolver()
class ListPartnerContactsResolver {
  @Query(() => ListPartnerContactsSchema, { nullable: true })
  @UseMiddleware(AuthenticatedChecker)
  async listPartnerContacts(
    @Ctx()
    context: ContextData,
    @Arg('data')
    data: ListPartnerContactsInput,
  ): Promise<ListPartnerContactsSchema> {
    const { id: partnerID } = context;
    const response = await listPartnerContactsUseCase.execute({
      partnerID,
      ...data,
    });
    return response;
  }
}

export { ListPartnerContactsResolver };
