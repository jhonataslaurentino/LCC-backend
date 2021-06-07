import { IBitrixDealRepository } from '../../repositories/IBitrixDealRepository';
import BitrixDealField from '../../schemas/BitrixDealField';

class GetBitrixDealFieldsUseCase {
  constructor(private bitrixDealsRepository: IBitrixDealRepository) {}

  async execute(): Promise<BitrixDealField[]> {
    const bitrixDealFields = await this.bitrixDealsRepository.listFields();
    return bitrixDealFields;
  }
}

export { GetBitrixDealFieldsUseCase };
