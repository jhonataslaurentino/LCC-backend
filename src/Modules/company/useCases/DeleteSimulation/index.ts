import { SimulationRepository } from '../../repositories/implementations/SimulationsRepository/SimulationRepository';
import { DeleteSimulationUseCase } from './DeleteSimulationUseCase';

const simulationsRepository = new SimulationRepository();
const deleteSimulationUseCase = new DeleteSimulationUseCase(
  simulationsRepository,
);
export { deleteSimulationUseCase };
