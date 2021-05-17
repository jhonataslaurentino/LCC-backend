import {
  Arg,
  Mutation,
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import { ContextData } from '../Context/context';
import AuthenticatedChecker from '../middlewares/AuthenticatedChecker';
import Installment from '../Schemas/Installment';
import SELICRate from '../Schemas/SELICRate';
import Simulation from '../Schemas/Simulation';
import GetSELICRateService from '../Services/bcb/GetSELICRateService';
import CreateSimulationService from '../Services/Simulations/CreateSimulationService';
import GetPriceTableSimulationService from '../Services/Simulations/GetPriceTableSimulationService';
import GetSACTableSimulationService from '../Services/Simulations/GetSACTableSimulationService';
import CreateSimulationInput from './types/Simulation/CreateSimulationInput';
import SimulationInput from './types/Simulation/PriceTable/SimulationInput';

@Resolver()
class SimulationsResolver {
  @Mutation(() => [Installment])
  getPriceTableSimulation(
    @Arg('data', { validate: true })
    { loanAmount, loanInterest, numberOfInstallments }: SimulationInput,
  ): Installment[] {
    const getPriceTableSimulationService = new GetPriceTableSimulationService();
    const priceTableInstallments = getPriceTableSimulationService.execute({
      loanAmount,
      loanInterest: loanInterest / 100,
      numberOfInstallments,
    });
    return priceTableInstallments;
  }

  @Mutation(() => [Installment])
  getSACSimulation(
    @Arg('data', { validate: true })
    { loanAmount, loanInterest, numberOfInstallments }: SimulationInput,
  ): Installment[] {
    const getSACTableSimulationService = new GetSACTableSimulationService();
    const SACInstallments = getSACTableSimulationService.execute({
      loanAmount,
      loanInterest: loanInterest / 100,
      numberOfInstallments,
    });
    return SACInstallments;
  }

  @Query(() => SELICRate)
  async getSELICRate(): Promise<SELICRate> {
    const getSELICRateService = new GetSELICRateService();
    const selicRate = await getSELICRateService.execute();
    return selicRate;
  }

  @Mutation(() => Simulation)
  @UseMiddleware(AuthenticatedChecker)
  async createSimulation(
    @Ctx()
    context: ContextData,
    @Arg('data', { validate: true })
    {
      value,
      numberOfInstallments,
      name,
      cpf,
      email,
      phone,
      dealTypeID,
    }: CreateSimulationInput,
  ): Promise<Simulation> {
    const { id: companyID } = context;
    const createSimulationService = new CreateSimulationService();
    const simulation = await createSimulationService.execute({
      companyID,
      cpf,
      dealTypeID,
      email,
      name,
      numberOfInstallments,
      phone,
      value,
    });
    return simulation;
  }
}

export default SimulationsResolver;
