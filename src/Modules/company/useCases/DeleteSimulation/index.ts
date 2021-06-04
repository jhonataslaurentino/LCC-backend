import { SimulationRepository } from '../../repositories/implementations/SimulationRepository';
import { DeleteSimulationUseCase } from './DeleteSimulationUseCase';

const simulationsRepository = SimulationRepository.getInstance();
const deleteSimulationUseCase = new DeleteSimulationUseCase(
  simulationsRepository,
);
export { deleteSimulationUseCase };
