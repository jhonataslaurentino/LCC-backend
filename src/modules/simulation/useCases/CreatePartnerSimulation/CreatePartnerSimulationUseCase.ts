import {
  ICreateSimulationDTO,
  ISimulationRepository,
} from '../../repositories/ISimulationRepository';
import Simulation from '../../schemas/Simulation';

class CreatePartnerSimulationUseCase {
  constructor(private simulationsRepository: ISimulationRepository) {}

  async execute(data: ICreateSimulationDTO): Promise<Simulation> {
    const createdSimulation = await this.simulationsRepository.createPartnerSimulation(
      data,
    );
    return createdSimulation;
  }
}

export { CreatePartnerSimulationUseCase };
