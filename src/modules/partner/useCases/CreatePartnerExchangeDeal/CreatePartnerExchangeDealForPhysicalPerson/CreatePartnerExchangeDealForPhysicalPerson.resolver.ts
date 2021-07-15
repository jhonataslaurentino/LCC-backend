import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { createPartnerExchangeDealForPhysicalPersonUseCase } from '.';
import { ContextData } from '../../../../../Context/context';
import AuthenticatedChecker from '../../../../../middlewares/AuthenticatedChecker';
import { BitrixDeal } from '../../../../Bitrix/schemas/BitrixDeal';
import { CreatePartnerExchangeDealForPhysicalPersonInput } from './CreatePartnerExchangeDealForPhysicalPersonInput';

@Resolver()
class CreatePartnerExchangeDealForPhysicalPersonResolver {
  @Mutation(() => BitrixDeal)
  @UseMiddleware(AuthenticatedChecker)
  async createPartnerExchangeDealForPhysicalPerson(
    @Ctx()
    context: ContextData,
    @Arg('data')
    data: CreatePartnerExchangeDealForPhysicalPersonInput,
  ): Promise<BitrixDeal> {
    const { id: companyID } = context;
    const createdDeal = await createPartnerExchangeDealForPhysicalPersonUseCase.execute(
      {
        companyID,
        ...data,
      },
    );
    return createdDeal;
  }
}

export { CreatePartnerExchangeDealForPhysicalPersonResolver };
