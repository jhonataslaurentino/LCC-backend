import axios, { AxiosInstance } from 'axios';
import endpointsConfig from '../../../../../config/endpoints.config';
import AppError from '../../../../../errors/AppError';
import { BitrixDeal } from '../../../schemas/BitrixDeal';
import BitrixDealField from '../../../schemas/BitrixDealField';
import {
  IBitrixDealRepository,
  ICreateRealEstateDealDTO,
  ICreateVehicularDealDTO,
  IFindByCompanyIDDTO,
  IListDealsResponse,
  IListDealsDTO,
  IUpdateDealDTO,
  ICreatePersonalDealDTO,
} from '../../IBitrixDealRepository';
import { CreatePersonalDealService } from './service/CreatePesronalDealService';
import { CreateRealEstateDealService } from './service/CreateRealEstateDealService';
import { CreateVehicularDealService } from './service/CreateVehicularDealService';
import { FindBitrixDealByIDService } from './service/FindBitrixDealByIDService';
import { GetBitrixDealsByCompanyIDService } from './service/GetBitrixDealByCompanyIDService';
import { GetBitrixDealFieldsService } from './service/GetBitrixDealFieldsService';
import { ListDealsService } from './service/ListDealsService';
import { UpdateBitrixDealFieldService } from './service/UpdateBitrixDealFieldService';

class BitrixDealRepository implements IBitrixDealRepository {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: endpointsConfig.bitrixBaseURL,
    });
  }

  async CreatePersonalDeal(data: ICreatePersonalDealDTO): Promise<BitrixDeal> {
    const createPersonalDealService = new CreatePersonalDealService(this.api);
    const dealID = await createPersonalDealService.execute(data);
    const deal = await this.findByID(dealID);
    return deal;
  }

  async list(data: IListDealsDTO): Promise<IListDealsResponse> {
    const listDealsService = new ListDealsService(this.api);
    const response = await listDealsService.execute(data);
    return response;
  }

  async CreateRealEstateDeal(
    data: ICreateRealEstateDealDTO,
  ): Promise<BitrixDeal> {
    const createRealEstateDealService = new CreateRealEstateDealService(
      this.api,
    );
    const dealID = await createRealEstateDealService.execute(data);
    const deal = await this.findByID(dealID);
    return deal;
  }

  async CreateVehicularDeal(
    data: ICreateVehicularDealDTO,
  ): Promise<BitrixDeal> {
    const createVehicularDealService = new CreateVehicularDealService(this.api);
    const dealID = await createVehicularDealService.execute(data);
    const bitrixDeal = await this.findByID(String(dealID));
    return bitrixDeal;
  }

  async listFields(): Promise<BitrixDealField[]> {
    const getBitrixDealFieldsService = new GetBitrixDealFieldsService(this.api);
    const bitrixDealFields = await getBitrixDealFieldsService.execute();
    return bitrixDealFields;
  }

  async findByID(id: string): Promise<BitrixDeal> {
    const findBitrixDealByIDService = new FindBitrixDealByIDService(this.api);
    const deal = await findBitrixDealByIDService.execute(id);
    return deal;
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
    const bitrixDealUpdated = await this.findByID(id);
    return bitrixDealUpdated;
  }

  async findByCompanyID({
    companyID,
    page,
    category_id,
  }: IFindByCompanyIDDTO): Promise<IListDealsResponse> {
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
