import { SimulationRepository } from '../../repositories/implementations/SimulationsRepository/SimulationRepository';
import { CreateSimulationUseCase } from './CreateSimulationUseCase';

const simulationsRepository = new SimulationRepository();
const createSimulationUseCase = new CreateSimulationUseCase(
  simulationsRepository,
);

export { createSimulationUseCase };
