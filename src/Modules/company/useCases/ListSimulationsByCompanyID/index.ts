import { SimulationRepository } from '../../repositories/implementations/SimulationsRepository/SimulationRepository';
import { ListSimulationsByCompanyIDUseCase } from './ListSimulationsByCompanyIDUseCase';

const simulationsRepository = new SimulationRepository();
const listSimulationsByCompanyIDUseCase = new ListSimulationsByCompanyIDUseCase(
  simulationsRepository,
);
export { listSimulationsByCompanyIDUseCase };
