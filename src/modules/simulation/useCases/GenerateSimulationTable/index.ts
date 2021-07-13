import { CompanyRepository } from '../../../company/repositories/implementations/CompanyRepository/CompanyRepository';
import { SimulationRepository } from '../../repositories/SimulationsRepository/SimulationRepository';
import { GenerateSimulationTableUseCase } from './GenerateSimulationTableUseCase';

const simulationsRepository = new SimulationRepository();
const companiesRepository = CompanyRepository.getInstance();
const generateSimulationTableUseCase = new GenerateSimulationTableUseCase(
  simulationsRepository,
  companiesRepository,
);

export { generateSimulationTableUseCase };
