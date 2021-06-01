import axios, { AxiosInstance } from 'axios';
import endpointsConfig from '../../../../../config/endpoints.config';
import {
  IBitrixDealRepository,
  IFindByCompanyIDDTO,
  IFindByCompanyIDResponse,
} from '../../IBitrixDealRepository';
import { GetBitrixDealsByCompanyIDService } from './service/GetBitrixDealByCompanyIDService';

class BitrixDealRepository implements IBitrixDealRepository {
  private api: AxiosInstance;

  private static INSTANCE: BitrixDealRepository;

  constructor() {
    this.api = axios.create({
      baseURL: endpointsConfig.bitrixBaseURL,
    });
  }

  public static getInstance(): BitrixDealRepository {
    if (!BitrixDealRepository.INSTANCE) {
      BitrixDealRepository.INSTANCE = new BitrixDealRepository();
    }
    return BitrixDealRepository.INSTANCE;
  }

  async findByCompanyID({
    companyID,
    page,
    category_id,
  }: IFindByCompanyIDDTO): Promise<IFindByCompanyIDResponse> {
    const getBitrixDealsByCompanyIDService = new GetBitrixDealsByCompanyIDService(
      this.api,
    );
    const {
      next,
      result,
      total,
    } = await getBitrixDealsByCompanyIDService.execute({
      companyID,
      dealCategoryID: category_id,
      page,
    });
    return {
      next,
      result,
      total,
    };
  }
}

export { BitrixDealRepository };
