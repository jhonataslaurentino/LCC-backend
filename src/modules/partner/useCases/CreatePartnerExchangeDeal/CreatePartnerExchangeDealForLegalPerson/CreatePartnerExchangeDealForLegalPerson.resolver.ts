import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { createPartnerExchangeDealForLegalPersonUseCase } from '.';
import { ContextData } from '../../../../../Context/context';
import AuthenticatedChecker from '../../../../../middlewares/AuthenticatedChecker';
import { BitrixDeal } from '../../../../Bitrix/schemas/BitrixDeal';
import { CreatePartnerExchangeDealForLegalPersonInput } from './CreatePartnerExchangeDealForLegalPersonInput';

@Resolver()
class CreatePartnerExchangeDealForLegalPersonResolver {
  @Mutation(() => BitrixDeal)
  @UseMiddleware(AuthenticatedChecker)
  async createPartnerExchangeDealForLegalPerson(
    @Ctx()
    context: ContextData,
    @Arg('data', { validate: true })
    data: CreatePartnerExchangeDealForLegalPersonInput,
  ): Promise<BitrixDeal> {
    const { id: companyID } = context;
    const createdDeal = await createPartnerExchangeDealForLegalPersonUseCase.execute(
      {
        ...data,
        companyID,
      },
    );
    return createdDeal;
  }
}

export { CreatePartnerExchangeDealForLegalPersonResolver };
