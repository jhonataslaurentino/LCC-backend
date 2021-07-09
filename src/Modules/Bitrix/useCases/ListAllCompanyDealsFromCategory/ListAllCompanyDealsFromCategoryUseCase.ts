import { IBitrixDealRepository } from '../../repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../schemas/BitrixDeal';

interface IRequest {
  categoryID: number;
  companyID: string;
}

class ListAllCompanyDealsFromCategoryUseCase {
  constructor(private bitrixDealsRepository: IBitrixDealRepository) {}

  async execute({ categoryID, companyID }: IRequest): Promise<BitrixDeal[]> {
    let currentPage = 0;
    let bitrixDeals: BitrixDeal[] = [];
    let isThereNextPage = false;
    do {
      // eslint-disable-next-line no-await-in-loop
      const { next, result } = await this.bitrixDealsRepository.list({
        categoryID,
        companyID: Number(companyID),
        page: currentPage,
      });
      bitrixDeals = [...bitrixDeals, ...result];
      isThereNextPage = typeof next !== 'undefined';
      if (isThereNextPage) {
        currentPage = next;
      }
    } while (isThereNextPage);
    return bitrixDeals;
  }
}

export { ListAllCompanyDealsFromCategoryUseCase };
