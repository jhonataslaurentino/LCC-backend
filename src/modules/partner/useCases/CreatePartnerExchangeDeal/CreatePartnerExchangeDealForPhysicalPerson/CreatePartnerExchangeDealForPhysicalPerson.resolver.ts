import { Arg, Mutation, Resolver } from 'type-graphql';
import { createPartnerExchangeDealForPhysicalPersonUseCase } from '.';
import { BitrixDeal } from '../../../../Bitrix/schemas/BitrixDeal';
import { CreatePartnerExchangeDealForPhysicalPersonInput } from './CreatePartnerExchangeDealForPhysicalPersonInput';

@Resolver()
class CreatePartnerExchangeDealForPhysicalPersonResolver {
  @Mutation(() => BitrixDeal)
  async createPartnerExchangeDealForPhysicalPerson(
    @Arg('data')
    data: CreatePartnerExchangeDealForPhysicalPersonInput,
  ): Promise<BitrixDeal> {
    const createdDeal = await createPartnerExchangeDealForPhysicalPersonUseCase.execute(
      data,
    );
    return createdDeal;
  }
}

export { CreatePartnerExchangeDealForPhysicalPersonResolver };
