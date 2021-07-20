import { ISimulationRepository } from '../../repositories/ISimulationRepository';
import Installment from '../../schemas/Installment';

class GeneratePRICETableSimulationUseCase {
  constructor(private simulationsRepository: ISimulationRepository) {}

  async execute(id: string): Promise<Installment[]> {
    const simulation = await this.simulationsRepository.findByID(id);
    const installments = this.simulationsRepository.generatePRICETable({
      loanAmount: simulation.value,
      loanInterest: (simulation.selicRate + simulation.averageRate) / 100,
      numberOfInstallments: simulation.numberOfInstallments,
    });
    return installments;
  }
}

export { GeneratePRICETableSimulationUseCase };
