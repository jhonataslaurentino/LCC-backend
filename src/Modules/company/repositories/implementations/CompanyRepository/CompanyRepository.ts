import Company from '../../../schemas/Company';
import {
  IChangePasswordDTO,
  ICompanyRepository,
  ICreateCompanyDTO,
  ICreateCompanyTokenDTO,
  IGenerateRandomPasswordDTO,
  IPushSimulationForCompanyDTO,
  IUpdateCompanyTokenDTO,
} from '../../ICompanyRepository';
import { ChangeCompanyPasswordService } from './services/ChangeCompanyPasswordService';
import { CreateCompanyService } from './services/CreateCompanyService';
import { CreateCompanyTokenService } from './services/CreateCompanyTokenService';
import { FindCompanyByEduzzBillIDService } from './services/FindCompanyByEduzzBillIDService';
import { FindCompanyByEduzzRecurrenceCodeService } from './services/FindCompanyByEduzzRecurrenceCodeService';
import { FindCompanyByEmailService } from './services/FindCompanyByEmailService';
import { FindCompanyByIDService } from './services/FindCompanyByIDService';
import { GenerateRandomPasswordService } from './services/GenerateRandomPasswordService';
import { ListAllCompaniesService } from './services/ListAllCompaniesService';
import { PushSimulationForCompanyService } from './services/PushSimulationForCompanyService';
import { RemoveCompanyAvatarService } from './services/RemoveCompanyAvatarService';
import { SuspendCompanyService } from './services/SuspendCompanyService';
import { UpdateCompanyTokenService } from './services/UpdateCompanyTokenService';

class CompanyRepository implements ICompanyRepository {
  async list(): Promise<Company[]> {
    const listAllCompaniesService = new ListAllCompaniesService();
    const companies = await listAllCompaniesService.execute();
    return companies;
  }

  async pushSimulation(data: IPushSimulationForCompanyDTO): Promise<Company> {
    const pushSimulationForCompanyService = new PushSimulationForCompanyService();
    const company = await pushSimulationForCompanyService.execute(data);
    return company;
  }

  async changePassword(data: IChangePasswordDTO): Promise<Company> {
    const changeCompanyPasswordService = new ChangeCompanyPasswordService();
    const companyModified = await changeCompanyPasswordService.execute(data);
    return companyModified;
  }

  async findByEmail(email: string): Promise<Company> {
    const findCompanyByEmailService = new FindCompanyByEmailService();
    const company = await findCompanyByEmailService.execute(email);
    return company;
  }

  async updateCompanyAccessToken(
    data: IUpdateCompanyTokenDTO,
  ): Promise<Company> {
    const updateCompanyTokenService = new UpdateCompanyTokenService();
    const companyUpdated = await updateCompanyTokenService.execute(data);
    return companyUpdated;
  }

  findByEduzzRecurrenceCode(recurrenceCode: number): Promise<Company> {
    const findCompanyByEduzzRecurrenceCodeService = new FindCompanyByEduzzRecurrenceCodeService();
    const company = findCompanyByEduzzRecurrenceCodeService.execute(
      recurrenceCode,
    );
    return company;
  }

  async findByEduzzBillID(billID: number): Promise<Company> {
    const findCompanyByEduzzBillIDService = new FindCompanyByEduzzBillIDService();
    const company = await findCompanyByEduzzBillIDService.execute(billID);
    return company;
  }

  async suspend(id: string): Promise<Company> {
    const suspendCompanyService = new SuspendCompanyService();
    const suspendedCompany = await suspendCompanyService.execute(id);
    return suspendedCompany;
  }

  generateRandomPassword({
    charactersLength,
  }: IGenerateRandomPasswordDTO): string {
    const generateRandomPasswordService = new GenerateRandomPasswordService();
    const password = generateRandomPasswordService.execute({
      charactersLength,
    });
    return password;
  }

  createCompanyToken(data: ICreateCompanyTokenDTO): string {
    const createCompanyTokenService = new CreateCompanyTokenService();
    const token = createCompanyTokenService.execute(data);
    return token;
  }

  async create(data: ICreateCompanyDTO): Promise<Company> {
    const createCompanyService = new CreateCompanyService();
    const company = await createCompanyService.execute(data);
    return company;
  }

  private static INSTANCE: CompanyRepository;

  public static getInstance(): CompanyRepository {
    if (!CompanyRepository.INSTANCE) {
      CompanyRepository.INSTANCE = new CompanyRepository();
    }
    return CompanyRepository.INSTANCE;
  }

  async findByID(id: string): Promise<Company> {
    const findCompanyByIDService = new FindCompanyByIDService();
    const company = await findCompanyByIDService.execute(id);
    return company;
  }

  async removeAvatar(id: string): Promise<Company> {
    const removeCompanyAvatarService = new RemoveCompanyAvatarService();
    const company = await removeCompanyAvatarService.execute(id);
    return company;
  }
}

export { CompanyRepository };
