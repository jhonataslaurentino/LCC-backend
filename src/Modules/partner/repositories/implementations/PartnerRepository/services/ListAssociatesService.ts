import { PartnerModel } from '../../../../models/PartnerModel';
import { Partner } from '../../../../Schemas/Partner';

class ListAssociatesService {
  async execute(partnerID: string): Promise<Partner[]> {
    const partner = await PartnerModel.findById(partnerID);
    return partner.associates as Partner[];
  }
}

export { ListAssociatesService };
