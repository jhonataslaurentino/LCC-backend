import { ISimulationRepository } from '../../repositories/ISimulationRepository';
import Simulation from '../../schemas/Simulation';

class ListPartnerSimulationsUseCase {
  constructor(private simulationsRepository: ISimulationRepository) {}

  async execute(id: string): Promise<Simulation[]> {
    const simulations = await this.simulationsRepository.findByPartnerID(id);
    return simulations;
  }
}

export { ListPartnerSimulationsUseCase };
