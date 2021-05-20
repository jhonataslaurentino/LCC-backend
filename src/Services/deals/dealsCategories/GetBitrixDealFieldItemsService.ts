import BitrixDealFieldItem from '../../../Schemas/BitrixDealFieldItem';
import GetBitrixDealFieldsService from './GetBitrixDealFieldsService';

interface Request {
  dealFieldKey: string;
}

class GetBitrixDealFieldItemsService {
  public async execute({
    dealFieldKey,
  }: Request): Promise<BitrixDealFieldItem[]> {
    const getBitrixDealFieldsService = new GetBitrixDealFieldsService();
    const bitrixDealFields = await getBitrixDealFieldsService.execute();

    const bitrixDealFieldsFiltered = bitrixDealFields.filter(
      bitrixDealField => bitrixDealField.key === dealFieldKey,
    );
    if (bitrixDealFieldsFiltered.length === 0) {
      throw new Error(
        `There is not a bitrix deal field with the key ${dealFieldKey}.`,
      );
    }
    return bitrixDealFieldsFiltered[0].items;
  }
}

export default GetBitrixDealFieldItemsService;