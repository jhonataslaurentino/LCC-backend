import { Resolver, UseMiddleware, Query, Arg, Ctx } from 'type-graphql';
import { getCompanyContactUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import { BitrixContact } from '../../../Bitrix/schemas/BitrixContact';
import { GetCompanyContactInput } from './GetCompanyContactInput';

@Resolver()
class GetCompanyContactResolver {
  @Query(() => BitrixContact)
  @UseMiddleware(AuthenticatedChecker)
  async getCompanyContact(
    @Ctx()
    context: ContextData,
    @Arg('data')
    { contactID }: GetCompanyContactInput,
  ): Promise<BitrixContact> {
    const { id: companyID } = context;
    const contact = await getCompanyContactUseCase.execute({
      companyID,
      contactID,
    });
    return contact;
  }
}

export { GetCompanyContactResolver };
