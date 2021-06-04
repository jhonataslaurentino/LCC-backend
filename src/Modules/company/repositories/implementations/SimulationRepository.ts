import Simulation from '../../schemas/Simulation';
import {
  ICreateSimulationDTO,
  IDeleteSimulationDTO,
  ISimulationRepository,
} from '../ISimulationRepository';
import CreateSimulationService from './services/CreateSimulationService';
import { DeleteSimulationService } from './services/DeleteSimulationService';
import { FindSimulationByCompanyIDService } from './services/FindSimulationByCompanyIDService';

class SimulationRepository implements ISimulationRepository {
  private static INSTANCE: SimulationRepository;

  public static getInstance(): SimulationRepository {
    if (!SimulationRepository.INSTANCE) {
      SimulationRepository.INSTANCE = new SimulationRepository();
    }
    return SimulationRepository.INSTANCE;
  }

  async delete(data: IDeleteSimulationDTO): Promise<Simulation> {
    const deleteSimulationService = new DeleteSimulationService();
    const simulation = await deleteSimulationService.execute(data);
    return simulation;
  }

  async create(data: ICreateSimulationDTO): Promise<Simulation> {
    const createSimulationService = new CreateSimulationService();
    const simulation = await createSimulationService.execute(data);
    return simulation;
  }

  async findByCompanyID(id: string): Promise<Simulation[]> {
    const findSimulationByCompanyIDService = new FindSimulationByCompanyIDService();
    const simulations = await findSimulationByCompanyIDService.execute(id);
    return simulations;
  }
}

export { SimulationRepository };
