import { PartnerModel } from '../../../../models/PartnerModel';
import { Partner } from '../../../../Schemas/Partner';

class FindPartnerByIDService {
  async execute(id: string): Promise<Partner | null> {
    const partner = await PartnerModel.findById(id);
    return partner;
  }
}

export { FindPartnerByIDService };
