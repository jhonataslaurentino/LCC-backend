import axios, { AxiosInstance } from 'axios';
import endpointsConfig from '../../../../../config/endpoints.config';
import { BitrixContact } from '../../../schemas/BitrixContact';
import {
  ICreateBitrixContactData,
  IBitrixContactRepository,
  IListByCompanyID,
  IListByCompanyIDResponse,
} from '../../IBitrixContactRepository';
import { CreateBitrixContactService } from './services/CreateBitrixContactService';
import { GetBitrixContactService } from './services/GetBitrixContactService';
import { GetCompanyBitrixContactsService } from './services/GetCompanyBitrixContactsService';

class BitrixContactRepository implements IBitrixContactRepository {
  private api: AxiosInstance;

  private static INSTANCE: BitrixContactRepository;

  constructor() {
    this.api = axios.create({
      baseURL: endpointsConfig.bitrixBaseURL,
    });
  }

  async findByID(id: number): Promise<BitrixContact> {
    const getBitrixContactService = new GetBitrixContactService(this.api);
    const contact = await getBitrixContactService.execute(id);
    return contact;
  }

  async ListByCompanyID({
    bitrixCompanyID,
    page,
  }: IListByCompanyID): Promise<IListByCompanyIDResponse> {
    const getCompanyBitrixContactsService = new GetCompanyBitrixContactsService(
      this.api,
    );
    const response = await getCompanyBitrixContactsService.execute({
      bitrixCompanyID,
      page,
    });
    return response;
  }

  public static getInstance(): BitrixContactRepository {
    if (!BitrixContactRepository.INSTANCE) {
      BitrixContactRepository.INSTANCE = new BitrixContactRepository();
    }
    return BitrixContactRepository.INSTANCE;
  }

  async create({
    companyID,
    email,
    name,
    personType,
    cnpj,
    cpf,
    phone,
  }: ICreateBitrixContactData): Promise<number> {
    const createBitrixContactService = new CreateBitrixContactService(this.api);
    const contactID = await createBitrixContactService.execute({
      companyID,
      email,
      name,
      cnpj,
      cpf,
      personType,
      phone,
    });
    return contactID;
  }
}

export { BitrixContactRepository };
