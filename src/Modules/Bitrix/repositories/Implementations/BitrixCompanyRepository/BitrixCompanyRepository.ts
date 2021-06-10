import axios, { AxiosInstance } from 'axios';
import endpointsConfig from '../../../../../config/endpoints.config';
import AppError from '../../../../../errors/AppError';
import { BitrixCompany } from '../../../schemas/BitrixCompany';
import {
  IBitrixCompanyRepository,
  ICreateBitrixCompanyDTO,
  IUpdateCompanyDTO,
} from '../../IBitrixCompanyRepository';
import { CreateBitrixCompanyService } from './services/CreateBitrixCompanyService';
import { FindBitrixCompanyByEmailService } from './services/FindBitrixCompanyByEmailService';
import { FindBitrixCompanyByID } from './services/FindBitrixCompanyByID';
import { UpdateBitrixCompanyFieldsService } from './services/UpdateBitrixCompanyFieldsService';

class BitrixCompanyRepository implements IBitrixCompanyRepository {
  private api: AxiosInstance;

  private static INSTANCE: BitrixCompanyRepository;

  constructor() {
    this.api = axios.create({
      baseURL: endpointsConfig.bitrixBaseURL,
    });
  }

  async findById(id: string): Promise<BitrixCompany> {
    const findBitrixCompanyByID = new FindBitrixCompanyByID(this.api);
    const bitrixCompany = await findBitrixCompanyByID.execute(id);
    return bitrixCompany;
  }

  async updateField({
    id,
    ...fields
  }: IUpdateCompanyDTO): Promise<BitrixCompany> {
    const updateBitrixCompanyFieldsService = new UpdateBitrixCompanyFieldsService(
      this.api,
    );
    const companyWasUpdate = await updateBitrixCompanyFieldsService.execute({
      id,
      ...fields,
    });
    if (!companyWasUpdate) {
      throw new AppError(
        'It was not possible update the fields of the company',
        500,
      );
    }
    const updatedCompany = await this.findById(id);
    return updatedCompany;
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
    cpf_cnpj,
  }: ICreateBitrixCompanyDTO): Promise<number> {
    const createBitrixCompanyService = new CreateBitrixCompanyService(this.api);
    const bitrixCompanyID = await createBitrixCompanyService.execute({
      email,
      name,
      phone,
      cpf_cnpj,
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
