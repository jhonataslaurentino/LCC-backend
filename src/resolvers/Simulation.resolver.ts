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
import { getCurrentSELICRateUseCase } from '../Modules/BCB/useCases/GetCurrentSELICRate';
import Simulation from '../Modules/company/schemas/Simulation';
import { createSimulationUseCase } from '../Modules/company/useCases/CreateSimulation';
import { deleteSimulationUseCase } from '../Modules/company/useCases/DeleteSimulation';
import { listSimulationsByCompanyIDUseCase } from '../Modules/company/useCases/ListSimulationsByCompanyID';
import Installment from '../Schemas/Installment';
import SELICRate from '../Schemas/SELICRate';
import GetPriceTableSimulationService from '../Services/Simulations/GetPriceTableSimulationService';
import GetSACTableSimulationService from '../Services/Simulations/GetSACTableSimulationService';
import CreateSimulationInput from './types/Simulation/CreateSimulationInput';
import DeleteSimulationInput from './types/Simulation/DeleteSimulationInput';
import GetSimulationInstallmentsInput from './types/Simulation/GetSimulationInstallmentsInput';

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
    {
      loanAmount,
      loanInterest,
      numberOfInstallments,
    }: GetSimulationInstallmentsInput,
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
    const selicRate = await getCurrentSELICRateUseCase.execute();
    return selicRate;
  }

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
      dealCategoryID,
      dealProductID,
      amortizationType,
      personType,
    }: CreateSimulationInput,
  ): Promise<Simulation> {
    const { id: companyID } = context;
    const simulation = await createSimulationUseCase.execute({
      companyID,
      cpf,
      email,
      name,
      numberOfInstallments,
      phone,
      value,
      dealCategoryID,
      dealProductID,
      amortizationType,
      personType,
    });
    return simulation;
  }

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

export default SimulationsResolver;
