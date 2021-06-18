import Company from '../schemas/Company';

interface ICreateCompanyDTO {
  name: string;
  userName: string;
  personName: string;
  eduzzBillID: string;
  eduzzRecurrenceCode?: number;
  email: string;
  password: string;
  cpf_cnpj: string;
  bitrix_id: string;
  phone: string;
  accessToken: string;
  roleID: string;
  haveLifeTimeAccess: boolean;
}

interface ICreateCompanyTokenDTO {
  eduzzBillID?: number;
  recurrence_code?: number;
  timeToExpireToken?: string;
}

interface IGenerateRandomPasswordDTO {
  charactersLength?: number;
}

interface IUpdateCompanyTokenDTO {
  id: string;
  token: string;
}

interface IChangePasswordDTO {
  id: string;
  newPassword: string;
}
interface IPushSimulationForCompanyDTO {
  simulationID: string;
  companyID: string;
}

interface ICompanyRepository {
  findByID(id: string): Promise<Company>;
  removeAvatar(id: string): Promise<Company>;
  create(data: ICreateCompanyDTO): Promise<Company>;
  createCompanyToken(data: ICreateCompanyTokenDTO): string;
  generateRandomPassword(data: IGenerateRandomPasswordDTO): string;
  findByEduzzBillID(billID: number): Promise<Company>;
  findByEduzzRecurrenceCode(recurrenceCode: number): Promise<Company>;
  updateCompanyAccessToken(data: IUpdateCompanyTokenDTO): Promise<Company>;
  suspend(id: string): Promise<Company>;
  findByEmail(email: string): Promise<Company>;
  changePassword(data: IChangePasswordDTO): Promise<Company>;
  pushSimulation(data: IPushSimulationForCompanyDTO): Promise<Company>;
  list(): Promise<Company[]>;
}

export {
  ICompanyRepository,
  ICreateCompanyDTO,
  ICreateCompanyTokenDTO,
  IGenerateRandomPasswordDTO,
  IUpdateCompanyTokenDTO,
  IChangePasswordDTO,
  IPushSimulationForCompanyDTO,
};
