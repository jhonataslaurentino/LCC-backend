import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { deleteSimulationUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import DeleteSimulationInput from '../../../../resolvers/types/Simulation/DeleteSimulationInput';
import Simulation from '../../schemas/Simulation';

@Resolver()
class DeleteSimulationResolver {
  @Mutation(() => Simulation, { nullable: true })
  @UseMiddleware(AuthenticatedChecker)
  async deleteSimulation(
    @Ctx()
    context: ContextData,
    @Arg('data')
    { id }: DeleteSimulationInput,
  ): Promise<Simulation> {
    const { id: companyID } = context;
    const simulation = await deleteSimulationUseCase.execute({
      companyID,
      simulationID: id,
    });
    return simulation;
  }
}

export { DeleteSimulationResolver };
