import SimulationModel from '../../Entities/Simulation';
import Simulation from '../../Schemas/Simulation';

interface Request {
  companyID: string;
}

class GetSimulationsService {
  public async execute({ companyID }: Request): Promise<Simulation[]> {
    const simulations = await SimulationModel.find({
      company: companyID,
    });
    return simulations;
  }
}

export default GetSimulationsService;
