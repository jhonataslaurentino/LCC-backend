import { Arg, Mutation, Resolver } from 'type-graphql';
import { createPartnerExchangeDealForLegalPersonUseCase } from '.';
import { BitrixDeal } from '../../../../Bitrix/schemas/BitrixDeal';
import { CreatePartnerExchangeDealForLegalPersonInput } from './CreatePartnerExchangeDealForLegalPersonInput';

@Resolver()
class CreatePartnerExchangeDealForLegalPersonResolver {
  @Mutation(() => BitrixDeal)
  async createPartnerExchangeDealForLegalPerson(
    @Arg('data', { validate: true })
    data: CreatePartnerExchangeDealForLegalPersonInput,
  ): Promise<BitrixDeal> {
    const createdDeal = await createPartnerExchangeDealForLegalPersonUseCase.execute(
      data,
    );
    return createdDeal;
  }
}

export { CreatePartnerExchangeDealForLegalPersonResolver };
