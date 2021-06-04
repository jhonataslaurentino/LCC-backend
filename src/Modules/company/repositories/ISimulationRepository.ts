import Simulation from '../schemas/Simulation';

interface ICreateSimulationDTO {
  value: number;
  numberOfInstallments: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  dealCategoryID: string;
  dealProductID: string;
  companyID: string;
  amortizationType: number;
  personType: string;
}

interface IDeleteSimulationDTO {
  simulationID: string;
  companyID: string;
}

interface ISimulationRepository {
  create(data: ICreateSimulationDTO): Promise<Simulation>;
  delete(data: IDeleteSimulationDTO): Promise<Simulation>;
  findByCompanyID(id: string): Promise<Simulation[]>;
}

export { ISimulationRepository, ICreateSimulationDTO, IDeleteSimulationDTO };
