import { SimulationRepository } from '../../repositories/SimulationsRepository/SimulationRepository';
import { ListPartnerSimulationsUseCase } from './ListPartnerSimulationsUseCase';

const simulationsRepository = new SimulationRepository();
const listPartnerSimulationsUseCase = new ListPartnerSimulationsUseCase(
  simulationsRepository,
);
export { listPartnerSimulationsUseCase };
