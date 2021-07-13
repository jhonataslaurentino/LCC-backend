import axios, { AxiosInstance } from 'axios';
import endpointsConfig from '../../../../../config/endpoints.config';
import BitrixDealCategory from '../../../schemas/BitrixDealCategory';
import { IBitrixDealCategoryRepository } from '../../IBitrixDealCategoryRepository';
import { GetBitrixDealCategoryByIDService } from './services/GetBitrixDealCategoryService';
import { GetBitrixDealsCategoriesService } from './services/GetBitrixDealsCategoriesService';

class BitrixDealCategoryRepository implements IBitrixDealCategoryRepository {
  private api: AxiosInstance;

  private static INSTANCE: BitrixDealCategoryRepository;

  public static getInstance(): BitrixDealCategoryRepository {
    if (!BitrixDealCategoryRepository.INSTANCE) {
      BitrixDealCategoryRepository.INSTANCE = new BitrixDealCategoryRepository();
    }
    return BitrixDealCategoryRepository.INSTANCE;
  }

  constructor() {
    this.api = axios.create({
      baseURL: endpointsConfig.bitrixBaseURL,
    });
  }

  async list(): Promise<BitrixDealCategory[]> {
    const getBitrixDealsCategoriesService = new GetBitrixDealsCategoriesService(
      this.api,
    );
    const bitrixDealsCategories = await getBitrixDealsCategoriesService.execute();
    return bitrixDealsCategories;
  }

  async findByID(id: string): Promise<BitrixDealCategory> {
    const getBitrixDealCategoryByIDService = new GetBitrixDealCategoryByIDService(
      this.api,
    );
    const dealCategory = await getBitrixDealCategoryByIDService.execute(id);
    return dealCategory;
  }
}

export { BitrixDealCategoryRepository };
