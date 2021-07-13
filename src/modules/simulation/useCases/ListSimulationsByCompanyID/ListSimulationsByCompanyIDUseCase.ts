import { ISimulationRepository } from '../../repositories/ISimulationRepository';
import Simulation from '../../schemas/Simulation';

class ListSimulationsByCompanyIDUseCase {
  constructor(private simulationsRepository: ISimulationRepository) {}

  async execute(companyID: string): Promise<Simulation[]> {
    const simulations = await this.simulationsRepository.findByCompanyID(
      companyID,
    );
    return simulations;
  }
}

export { ListSimulationsByCompanyIDUseCase };
