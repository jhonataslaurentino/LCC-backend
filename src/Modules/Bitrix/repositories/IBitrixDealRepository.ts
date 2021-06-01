import { BitrixDeal } from '../models/BitrixDeal';

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
interface IBitrixDealRepository {
  findByCompanyID({
    companyID,
    page,
    category_id,
  }: IFindByCompanyIDDTO): Promise<IFindByCompanyIDResponse>;
}

export { IBitrixDealRepository, IFindByCompanyIDDTO, IFindByCompanyIDResponse };
