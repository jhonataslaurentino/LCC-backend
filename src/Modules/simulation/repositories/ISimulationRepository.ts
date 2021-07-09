import Installment from '../schemas/Installment';
import Simulation from '../schemas/Simulation';

interface ICreateSimulationDTO {
  value: number;
  numberOfInstallments: number;
  name: string;
  cpf_cnpj: string;
  email: string;
  phone: string;
  dealCategoryID: string;
  dealProductID: string;
  companyID: string;
  amortizationType: number;
  personType: string;
  birthday: Date;
}

interface IDeleteSimulationDTO {
  simulationID: string;
  companyID: string;
}

interface IGenerateSimulationTableDTO {
  loanAmount: number;
  loanInterest: number;
  numberOfInstallments: number;
}

interface ISimulationRepository {
  create(data: ICreateSimulationDTO): Promise<Simulation>;
  createPartnerSimulation(data: ICreateSimulationDTO): Promise<Simulation>;
  delete(data: IDeleteSimulationDTO): Promise<Simulation>;
  findByCompanyID(id: string): Promise<Simulation[]>;
  findByPartnerID(id: string): Promise<Simulation[]>;
  findByID(id: string): Promise<Simulation>;
  generatePRICETable(data: IGenerateSimulationTableDTO): Installment[];
  generateSACTable(data: IGenerateSimulationTableDTO): Installment[];
}

export {
  ISimulationRepository,
  ICreateSimulationDTO,
  IDeleteSimulationDTO,
  IGenerateSimulationTableDTO,
};
