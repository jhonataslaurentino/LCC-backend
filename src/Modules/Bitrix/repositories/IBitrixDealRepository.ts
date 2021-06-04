import { BitrixDeal } from '../schemas/BitrixDeal';

interface IFindByCompanyIDDTO {
  page: number;
  companyID: string;
  category_id: string;
}

interface IFindByCompanyIDResponse {
  result: BitrixDeal[];
  total: number;
  next: number;
}

interface IUpdateDealDTO {
  id: string;
  [field: string]: string | number;
}

interface IBitrixDealRepository {
  findByCompanyID({
    companyID,
    page,
    category_id,
  }: IFindByCompanyIDDTO): Promise<IFindByCompanyIDResponse>;
  UpdateDealField(data: IUpdateDealDTO): Promise<BitrixDeal>;
  findByID(id: string): Promise<BitrixDeal>;
}

export {
  IBitrixDealRepository,
  IFindByCompanyIDDTO,
  IFindByCompanyIDResponse,
  IUpdateDealDTO,
};
