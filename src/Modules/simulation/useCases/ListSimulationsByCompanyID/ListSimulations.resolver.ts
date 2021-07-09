import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { listSimulationsByCompanyIDUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import Simulation from '../../schemas/Simulation';

@Resolver()
class ListSimulations {
  @Query(() => [Simulation], { nullable: true })
  @UseMiddleware(AuthenticatedChecker)
  async getSimulations(
    @Ctx()
    context: ContextData,
  ): Promise<Simulation[]> {
    const { id: companyID } = context;
    const simulations = await listSimulationsByCompanyIDUseCase.execute(
      companyID,
    );
    return simulations;
  }
}

export { ListSimulations };
