import { SimulationRepository } from '../../repositories/SimulationsRepository/SimulationRepository';
import { DeleteSimulationUseCase } from './DeleteSimulationUseCase';

const simulationsRepository = new SimulationRepository();
const deleteSimulationUseCase = new DeleteSimulationUseCase(
  simulationsRepository,
);
export { deleteSimulationUseCase };
