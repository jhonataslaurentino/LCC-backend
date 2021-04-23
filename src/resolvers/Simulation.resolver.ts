import { Arg, Mutation, Resolver } from 'type-graphql';
import Installment from '../Schemas/Installment';
import GetPriceTableSimulationService from '../Services/Simulations/GetPriceTableSimulationService';
import GetSACTableSimulationService from '../Services/Simulations/GetSACTableSimulationService';
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
}

export default SimulationsResolver;
