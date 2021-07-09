import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { createSimulationUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import Simulation from '../../schemas/Simulation';
import CreateSimulationInput from './CreateSimulationInput';

@Resolver()
class CreateSimulationResolver {
  @Mutation(() => Simulation)
  @UseMiddleware(AuthenticatedChecker)
  async createSimulation(
    @Ctx()
    context: ContextData,
    @Arg('data', { validate: true })
    data: CreateSimulationInput,
  ): Promise<Simulation> {
    const { id: companyID } = context;
    const simulation = await createSimulationUseCase.execute({
      ...data,
      companyID,
    });
    return simulation;
  }
}

export { CreateSimulationResolver };
