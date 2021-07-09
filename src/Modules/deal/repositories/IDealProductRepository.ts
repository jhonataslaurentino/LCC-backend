import { DealProduct } from '../schemas/DealProduct';

interface ICreateDealProductData {
  name: string;
  bitrix_id: string;
  averageRate: number;
  competitiveRate: number;
  dealCategoryID: string;
  maxNumberOfInstallments: number;
  url?: string;
  isInDevelopment?: boolean;
}

interface IEditDealProductDTO {
  id: string;
  name: string;
  averageRate: number;
  competitiveRate: number;
  maxNumberOfInstallments: number;
}

interface IDealProductRepository {
  create(data: ICreateDealProductData): Promise<DealProduct>;
  delete(dealProductID: string): Promise<DealProduct>;
  list(): Promise<DealProduct[]>;
  Edit(data: IEditDealProductDTO): Promise<DealProduct>;
  findById(id: string): Promise<DealProduct>;
}

export { IDealProductRepository, ICreateDealProductData, IEditDealProductDTO };
