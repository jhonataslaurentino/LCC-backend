import axios, { AxiosInstance } from 'axios';
import endpointsConfig from '../../../../../config/endpoints.config';
import { BitrixCompany } from '../../../models/BitrixCompany';
import {
  IBitrixCompanyRepository,
  ICreateBitrixCompanyDTO,
} from '../../IBitrixCompanyRepository';
import { CreateBitrixCompanyService } from './services/CreateBitrixCompanyService';
import { FindBitrixCompanyByEmailService } from './services/FindBitrixCompanyByEmailService';

class BitrixCompanyRepository implements IBitrixCompanyRepository {
  private api: AxiosInstance;

  private static INSTANCE: BitrixCompanyRepository;

  constructor() {
    this.api = axios.create({
      baseURL: endpointsConfig.bitrixBaseURL,
    });
  }

  public static getInstance(): BitrixCompanyRepository {
    if (!BitrixCompanyRepository.INSTANCE) {
      BitrixCompanyRepository.INSTANCE = new BitrixCompanyRepository();
    }
    return BitrixCompanyRepository.INSTANCE;
  }

  async createBitrixCompany({
    email,
    phone,
    name,
  }: ICreateBitrixCompanyDTO): Promise<number> {
    const createBitrixCompanyService = new CreateBitrixCompanyService(this.api);
    const bitrixCompanyID = await createBitrixCompanyService.execute({
      email,
      name,
      phone,
    });
    return bitrixCompanyID;
  }

  async findByEmail(email: string): Promise<BitrixCompany | null> {
    const findBitrixCompanyByEmailService = new FindBitrixCompanyByEmailService(
      this.api,
    );
    const bitrixCompany = await findBitrixCompanyByEmailService.execute(email);
    return bitrixCompany;
  }
}

export { BitrixCompanyRepository };
