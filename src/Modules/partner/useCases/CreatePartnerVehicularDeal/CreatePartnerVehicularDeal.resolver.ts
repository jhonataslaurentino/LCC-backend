import { Arg, Mutation, Resolver } from 'type-graphql';
import { createPartnerVehicularDealUse } from '.';
import { BitrixDeal } from '../../../Bitrix/schemas/BitrixDeal';
import { CreatePartnerVehicularDealInput } from './CreatePartnerVehicularDealInput';

@Resolver()
class CreatePartnerVehicularDealResolver {
  @Mutation(() => BitrixDeal, {
    description: 'Create a vehicular deal for a partner',
  })
  async createPartnerVehicularDeal(
    @Arg('data')
    mutationData: CreatePartnerVehicularDealInput,
  ): Promise<BitrixDeal> {
    const vehicularDeal = await createPartnerVehicularDealUse.execute(
      mutationData,
    );
    return vehicularDeal;
  }
}

export { CreatePartnerVehicularDealResolver };
