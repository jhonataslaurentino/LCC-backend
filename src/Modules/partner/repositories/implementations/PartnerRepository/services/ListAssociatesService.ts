import AppError from '../../../../../../errors/AppError';
import { PartnerModel } from '../../../../models/PartnerModel';
import { Partner } from '../../../../Schemas/Partner';

class ListAssociatesService {
  async execute(partnerID: string): Promise<Partner[]> {
    const partner = await PartnerModel.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const associates = await PartnerModel.find({
      createdBy: partner.id,
    });
    return associates;
  }
}

export { ListAssociatesService };
