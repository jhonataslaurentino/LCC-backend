import { SimulationRepository } from '../../repositories/implementations/SimulationRepository';
import { ListSimulationsByCompanyIDUseCase } from './ListSimulationsByCompanyIDUseCase';

const simulationsRepository = SimulationRepository.getInstance();
const listSimulationsByCompanyIDUseCase = new ListSimulationsByCompanyIDUseCase(
  simulationsRepository,
);
export { listSimulationsByCompanyIDUseCase };
