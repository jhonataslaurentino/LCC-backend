import {
  IDeleteSimulationDTO,
  ISimulationRepository,
} from '../../repositories/ISimulationRepository';
import Simulation from '../../schemas/Simulation';

class DeleteSimulationUseCase {
  constructor(private simulationsRepository: ISimulationRepository) {}

  async execute(data: IDeleteSimulationDTO): Promise<Simulation> {
    const simulation = await this.simulationsRepository.delete(data);
    return simulation;
  }
}

export { DeleteSimulationUseCase };
