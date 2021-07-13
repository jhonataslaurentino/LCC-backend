import { Arg, Mutation, Resolver, Query, UseMiddleware } from 'type-graphql';
import AuthenticatedChecker from '../middlewares/AuthenticatedChecker';
import { getCurrentSELICRateUseCase } from '../modules/BCB/useCases/GetCurrentSELICRate';
import { SimulationRepository } from '../modules/simulation/repositories/SimulationsRepository/SimulationRepository';
import SELICRate from '../Schemas/SELICRate';
import GetSimulationInstallmentsInput from './types/Simulation/GetSimulationInstallmentsInput';
import Installment from '../modules/simulation/schemas/Installment';

@Resolver()
class SimulationsResolver {
  @Mutation(() => [Installment])
  @UseMiddleware(AuthenticatedChecker)
  getPriceTableSimulation(
    @Arg('data', { validate: true })
    {
      loanAmount,
      loanInterest,
      numberOfInstallments,
    }: GetSimulationInstallmentsInput,
  ): Installment[] {
    const simulationsRepository = new SimulationRepository();
    const installments = simulationsRepository.generatePRICETable({
      loanAmount,
      loanInterest: loanInterest / 100,
      numberOfInstallments,
    });
    return installments;
  }

  @Mutation(() => [Installment])
  getSACSimulation(
    @Arg('data', { validate: true })
    {
      loanAmount,
      loanInterest,
      numberOfInstallments,
    }: GetSimulationInstallmentsInput,
  ): Installment[] {
    const simulationsRepository = new SimulationRepository();
    const SACInstallments = simulationsRepository.generateSACTable({
      loanAmount,
      loanInterest: loanInterest / 100,
      numberOfInstallments,
    });
    return SACInstallments;
  }

  @Query(() => SELICRate)
  async getSELICRate(): Promise<SELICRate> {
    const selicRate = await getCurrentSELICRateUseCase.execute();
    return selicRate;
  }
}

export default SimulationsResolver;
