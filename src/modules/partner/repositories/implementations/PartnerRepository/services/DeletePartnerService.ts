import AppError from '../../../../../../errors/AppError';
import { PartnerModel } from '../../../../models/PartnerModel';
import { Partner } from '../../../../Schemas/Partner';

class DeletePartnerService {
  async execute(partnerID: string): Promise<Partner> {
    const deletedPartner = await PartnerModel.findByIdAndDelete(partnerID);
    if (!deletedPartner) {
      throw new AppError('Partner does not exists', 404);
    }
    return deletedPartner;
  }
}

export { DeletePartnerService };
