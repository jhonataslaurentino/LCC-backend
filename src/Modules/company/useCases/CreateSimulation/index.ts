import { SimulationRepository } from '../../repositories/implementations/SimulationRepository';
import { CreateSimulationUseCase } from './CreateSimulationUseCase';

const simulationsRepository = SimulationRepository.getInstance();
const createSimulationUseCase = new CreateSimulationUseCase(
  simulationsRepository,
);

export { createSimulationUseCase };
