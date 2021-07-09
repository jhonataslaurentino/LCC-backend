import { SimulationRepository } from '../../repositories/SimulationsRepository/SimulationRepository';
import { CreatePartnerSimulationUseCase } from './CreatePartnerSimulationUseCase';

const simulationsRepository = new SimulationRepository();
const createPartnerSimulationUseCase = new CreatePartnerSimulationUseCase(
  simulationsRepository,
);

export { createPartnerSimulationUseCase };
