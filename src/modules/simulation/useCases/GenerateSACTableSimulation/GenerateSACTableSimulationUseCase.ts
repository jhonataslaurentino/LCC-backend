import { ISimulationRepository } from '../../repositories/ISimulationRepository';
import Installment from '../../schemas/Installment';

class GenerateSACTableSimulationUseCase {
  constructor(private simulationsRepository: ISimulationRepository) {}

  async execute(id: string): Promise<Installment[]> {
    const simulation = await this.simulationsRepository.findByID(id);
    const installments = this.simulationsRepository.generateSACTable({
      loanAmount: simulation.value,
      loanInterest: simulation.selicRate + simulation.averageRate,
      numberOfInstallments: simulation.numberOfInstallments,
    });
    return installments;
  }
}

export { GenerateSACTableSimulationUseCase };
