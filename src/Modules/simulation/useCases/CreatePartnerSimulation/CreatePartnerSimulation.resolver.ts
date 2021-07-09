import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { createPartnerSimulationUseCase } from '.';
import { ContextData } from '../../../../Context/context';
import AuthenticatedChecker from '../../../../middlewares/AuthenticatedChecker';
import Simulation from '../../schemas/Simulation';
import { CreatePartnerSimulationInput } from './CreatePartnerSimulationInput';

@Resolver()
class CreatePartnerSimulationResolver {
  @Mutation(() => Simulation)
  @UseMiddleware(AuthenticatedChecker)
  async createPartnerSimulation(
    @Ctx()
    context: ContextData,
    @Arg('data', { validate: true })
    data: CreatePartnerSimulationInput,
  ): Promise<Simulation> {
    const { id: companyID } = context;
    const createdSimulation = await createPartnerSimulationUseCase.execute({
      ...data,
      companyID,
    });
    return createdSimulation;
  }
}

export { CreatePartnerSimulationResolver };
