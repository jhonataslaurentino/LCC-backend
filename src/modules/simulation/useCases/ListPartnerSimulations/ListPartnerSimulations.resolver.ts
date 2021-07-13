import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { listPartnerSimulationsUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import Simulation from '../../schemas/Simulation';

@Resolver()
class ListPartnerSimulations {
  @Query(() => [Simulation], { nullable: true })
  @UseMiddleware(AuthenticatedChecker)
  async listPartnerSimulations(
    @Ctx()
    context: ContextData,
  ): Promise<Simulation[]> {
    const { id: partnerID } = context;
    const simulations = await listPartnerSimulationsUseCase.execute(partnerID);
    return simulations;
  }
}

export { ListPartnerSimulations };
