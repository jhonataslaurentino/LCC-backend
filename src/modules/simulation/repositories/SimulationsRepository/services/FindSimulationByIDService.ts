import AppError from '../../../../../errors/AppError';
import { SimulationModel } from '../../../models/Simulation';
import Simulation from '../../../schemas/Simulation';

class FindSimulationByIDService {
  async execute(id: string): Promise<Simulation | null> {
    const simulation = await SimulationModel.findById(id);
    if (!simulation) {
      throw new AppError('Simulation does not exists', 404);
    }
    return simulation;
  }
}

export { FindSimulationByIDService };
