import axios, { AxiosInstance } from 'axios';
import endpointsConfig from '../../../../../config/endpoints.config';
import AppError from '../../../../../errors/AppError';
import { BitrixDeal } from '../../../schemas/BitrixDeal';
import {
  IBitrixDealRepository,
  IFindByCompanyIDDTO,
  IFindByCompanyIDResponse,
  IUpdateDealDTO,
} from '../../IBitrixDealRepository';
import { FindBitrixDealByIDService } from './service/FindBitrixDealByIDService';
import { GetBitrixDealsByCompanyIDService } from './service/GetBitrixDealByCompanyIDService';
import { UpdateBitrixDealFieldService } from './service/UpdateBitrixDealFieldService';

class BitrixDealRepository implements IBitrixDealRepository {
  private api: AxiosInstance;

  private static INSTANCE: BitrixDealRepository;

  constructor() {
    this.api = axios.create({
      baseURL: endpointsConfig.bitrixBaseURL,
    });
  }

  async findByID(id: string): Promise<BitrixDeal> {
    const findBitrixDealByIDService = new FindBitrixDealByIDService(this.api);
    const deal = await findBitrixDealByIDService.execute(id);
    return deal;
  }

  public static getInstance(): BitrixDealRepository {
    if (!BitrixDealRepository.INSTANCE) {
      BitrixDealRepository.INSTANCE = new BitrixDealRepository();
    }
    return BitrixDealRepository.INSTANCE;
  }

  async UpdateDealField({
    id,
    ...fields
  }: IUpdateDealDTO): Promise<BitrixDeal> {
    const updateBitrixDealFieldService = new UpdateBitrixDealFieldService(
      this.api,
    );
    const dealWasUpdated = await updateBitrixDealFieldService.execute({
      id,
      ...fields,
    });
    if (!dealWasUpdated) {
      throw new AppError(
        'It was not possible update the fields of the deal',
        500,
      );
    }
    const findBitrixDealByIDService = new FindBitrixDealByIDService(this.api);
    const bitrixDealUpdated = await findBitrixDealByIDService.execute(id);
    return bitrixDealUpdated;
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
