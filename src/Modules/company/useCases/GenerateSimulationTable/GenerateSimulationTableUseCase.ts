import AppError from '../../../../errors/AppError';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';
import { ISimulationRepository } from '../../repositories/ISimulationRepository';
import Installment from '../../schemas/Installment';
import { generatePRICETableSimulationUseCase } from '../GeneratePRICETableSimulation';
import { generateSACTableSimulationUseCase } from '../GenerateSACTableSimulation';

interface IGenerateSimulationTableDTO {
  simulationID: string;
  companyID: string;
}

class GenerateSimulationTableUseCase {
  constructor(
    private simulationsRepository: ISimulationRepository,
    private companiesRepository: ICompanyRepository,
  ) {}

  async execute({
    companyID,
    simulationID,
  }: IGenerateSimulationTableDTO): Promise<Installment[]> {
    const company = await this.companiesRepository.findByID(companyID);
    const simulation = await this.simulationsRepository.findByID(simulationID);
    const companyHasSimulation = company.simulations.includes(simulation);
    if (!companyHasSimulation) {
      throw new AppError('Unauthorized', 401);
    }
    const installments =
      simulation.amortizationType === 0
        ? await generateSACTableSimulationUseCase.execute(simulationID)
        : await generatePRICETableSimulationUseCase.execute(simulationID);
    return installments;
  }
}

export { GenerateSimulationTableUseCase };
