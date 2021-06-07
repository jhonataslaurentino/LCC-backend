import { CompanyRepository } from '../../repositories/implementations/CompanyRepository/CompanyRepository';
import { SimulationRepository } from '../../repositories/implementations/SimulationsRepository/SimulationRepository';
import { GenerateSimulationTableUseCase } from './GenerateSimulationTableUseCase';

const simulationsRepository = new SimulationRepository();
const companiesRepository = CompanyRepository.getInstance();
const generateSimulationTableUseCase = new GenerateSimulationTableUseCase(
  simulationsRepository,
  companiesRepository,
);

export { generateSimulationTableUseCase };
