import {
  ICreateSimulationDTO,
  ISimulationRepository,
} from '../../repositories/ISimulationRepository';
import Simulation from '../../schemas/Simulation';

class CreateSimulationUseCase {
  constructor(private simulationRepository: ISimulationRepository) {}

  async execute(data: ICreateSimulationDTO): Promise<Simulation> {
    const simulation = await this.simulationRepository.create(data);
    return simulation;
  }
}

export { CreateSimulationUseCase };
