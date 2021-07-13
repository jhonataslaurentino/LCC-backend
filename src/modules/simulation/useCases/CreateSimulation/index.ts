import { SimulationRepository } from '../../repositories/SimulationsRepository/SimulationRepository';
import { CreateSimulationUseCase } from './CreateSimulationUseCase';

const simulationsRepository = new SimulationRepository();
const createSimulationUseCase = new CreateSimulationUseCase(
  simulationsRepository,
);

export { createSimulationUseCase };
