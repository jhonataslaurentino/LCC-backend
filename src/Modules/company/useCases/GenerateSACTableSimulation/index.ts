import { SimulationRepository } from '../../repositories/implementations/SimulationsRepository/SimulationRepository';
import { GenerateSACTableSimulationUseCase } from './GenerateSACTableSimulationUseCase';

const simulationsRepository = new SimulationRepository();
const generateSACTableSimulationUseCase = new GenerateSACTableSimulationUseCase(
  simulationsRepository,
);

export { generateSACTableSimulationUseCase };
