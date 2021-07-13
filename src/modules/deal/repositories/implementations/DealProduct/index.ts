import CreateDealProductService from '../../../../../Services/deals/dealsCategories/CreateDealProductService';
import EditDealProductService from '../../../../../Services/deals/dealsCategories/EditDealProductService';
import { DealProduct } from '../../../schemas/DealProduct';
import {
  ICreateDealProductData,
  IDealProductRepository,
  IEditDealProductDTO,
} from '../../IDealProductRepository';
import DeleteDealProductService from './services/DeleteDealProductService';
import { FindDealProductByIDService } from './services/FindDealProductByIDService';
import { ListDealProductsService } from './services/ListDealProductsService';

class DealProductRepository implements IDealProductRepository {
  async findById(id: string): Promise<DealProduct> {
    const findDealProductByIDService = new FindDealProductByIDService();
    const foundDealProduct = await findDealProductByIDService.execute(id);
    return foundDealProduct;
  }

  async Edit(data: IEditDealProductDTO): Promise<DealProduct> {
    const editDealProductService = new EditDealProductService();
    const changedDealProduct = await editDealProductService.execute(data);
    return changedDealProduct;
  }

  async list(): Promise<DealProduct[]> {
    const listDealProductsService = new ListDealProductsService();
    const dealProducts = await listDealProductsService.execute();
    return dealProducts;
  }

  async delete(dealProductID: string): Promise<DealProduct> {
    const deleteDealProductService = new DeleteDealProductService();
    const deletedDealProduct = await deleteDealProductService.execute(
      dealProductID,
    );
    return deletedDealProduct;
  }

  async create(data: ICreateDealProductData): Promise<DealProduct> {
    const createDealProductService = new CreateDealProductService();
    const createdDealProduct = await createDealProductService.execute(data);
    return createdDealProduct;
  }
}

export { DealProductRepository };
