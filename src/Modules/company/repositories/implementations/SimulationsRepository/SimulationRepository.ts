import Installment from '../../../schemas/Installment';
import Simulation from '../../../schemas/Simulation';
import {
  ICreateSimulationDTO,
  IDeleteSimulationDTO,
  IGenerateSimulationTableDTO,
  ISimulationRepository,
} from '../../ISimulationRepository';
import CreateSimulationService from './services/CreateSimulationService';
import { DeleteSimulationService } from './services/DeleteSimulationService';
import { FindSimulationByCompanyIDService } from './services/FindSimulationByCompanyIDService';
import { FindSimulationByIDService } from './services/FindSimulationByIDService';
import { GeneratePRICETableSimulationService } from './services/GeneratePRICETableSimulationService';
import { GenerateSACTableSimulationService } from './services/GenerateSACTableService';

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

  async findByID(id: string): Promise<Simulation> {
    const findSimulationByIDService = new FindSimulationByIDService();
    const simulation = await findSimulationByIDService.execute(id);
    return simulation;
  }

  async findByCompanyID(id: string): Promise<Simulation[]> {
    const findSimulationByCompanyIDService = new FindSimulationByCompanyIDService();
    const simulations = await findSimulationByCompanyIDService.execute(id);
    return simulations;
  }

  generatePRICETable(data: IGenerateSimulationTableDTO): Installment[] {
    const generatePRICETableSimulationService = new GeneratePRICETableSimulationService();
    const installments = generatePRICETableSimulationService.execute(data);
    return installments;
  }

  generateSACTable(data: IGenerateSimulationTableDTO): Installment[] {
    const generateSACTableSimulationService = new GenerateSACTableSimulationService();
    const installments = generateSACTableSimulationService.execute(data);
    return installments;
  }
}

export { SimulationRepository };
