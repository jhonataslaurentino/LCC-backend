import CreateSimulationService from './services/CreateSimulationService';
import { DeleteSimulationService } from './services/DeleteSimulationService';
import { FindSimulationByCompanyIDService } from './services/FindSimulationByCompanyIDService';
import { FindSimulationByIDService } from './services/FindSimulationByIDService';
import { GeneratePRICETableSimulationService } from './services/GeneratePRICETableSimulationService';
import { GenerateSACTableSimulationService } from './services/GenerateSACTableService';
import Simulation from '../../schemas/Simulation';
import {
  ICreateSimulationDTO,
  IDeleteSimulationDTO,
  IGenerateSimulationTableDTO,
  ISimulationRepository,
} from '../ISimulationRepository';
import Installment from '../../schemas/Installment';
import { CreatePartnerSimulationService } from './services/CreatePartnerSimulationService';
import { FindSimulationsByPartnerIDService } from './services/FindSimulationsByPartnerIDService';

class SimulationRepository implements ISimulationRepository {
  async findByPartnerID(id: string): Promise<Simulation[]> {
    const findSimulationsByPartnerIDService = new FindSimulationsByPartnerIDService();
    const simulations = await findSimulationsByPartnerIDService.execute(id);
    return simulations;
  }

  async createPartnerSimulation(
    data: ICreateSimulationDTO,
  ): Promise<Simulation> {
    const createPartnerSimulationService = new CreatePartnerSimulationService();
    const createdSimulation = await createPartnerSimulationService.execute(
      data,
    );
    return createdSimulation;
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
