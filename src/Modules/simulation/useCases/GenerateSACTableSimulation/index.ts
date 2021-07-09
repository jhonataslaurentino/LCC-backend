import { SimulationRepository } from '../../repositories/SimulationsRepository/SimulationRepository';
import { GenerateSACTableSimulationUseCase } from './GenerateSACTableSimulationUseCase';

const simulationsRepository = new SimulationRepository();
const generateSACTableSimulationUseCase = new GenerateSACTableSimulationUseCase(
  simulationsRepository,
);

export { generateSACTableSimulationUseCase };
