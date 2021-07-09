import { Arg, Mutation, Resolver } from 'type-graphql';
import { createPartnerRealEstateDealUseCase } from '.';
import { BitrixDeal } from '../../../Bitrix/schemas/BitrixDeal';
import { CreatePartnerRealEstateDealInput } from './CreatePartnerRealEstateDealInput';

@Resolver()
class CreatePartnerRealEstateResolver {
  @Mutation(() => BitrixDeal, {
    description: 'Create a real estate deal for a partner',
  })
  async createPartnerRealEstate(
    @Arg('data', { validate: true })
    mutationData: CreatePartnerRealEstateDealInput,
  ): Promise<BitrixDeal> {
    const createdPartnerRealEstateDeal = await createPartnerRealEstateDealUseCase.execute(
      mutationData,
    );
    return createdPartnerRealEstateDeal;
  }
}

export { CreatePartnerRealEstateResolver };
