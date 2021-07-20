import { PartnerModel } from '../../../../models/PartnerModel';
import { Partner } from '../../../../Schemas/Partner';
import { IChangePartnerURL } from '../../../IPartnerRepository';

class ChangePartnerURlService {
  async execute({ partnerID, url }: IChangePartnerURL): Promise<Partner> {
    const partner = await PartnerModel.findByIdAndUpdate(partnerID, {
      siteURL: url,
    });
    return partner;
  }
}

export { ChangePartnerURlService };
