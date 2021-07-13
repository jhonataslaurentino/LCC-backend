import { PartnerModel } from '../../../../models/PartnerModel';
import { Partner } from '../../../../Schemas/Partner';

class FindPartnerByEmailService {
  async execute(email: string): Promise<Partner | null> {
    const partner = await PartnerModel.findOne({
      email,
    });
    return partner;
  }
}

export { FindPartnerByEmailService };
