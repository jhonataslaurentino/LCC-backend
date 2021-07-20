import { PartnerModel } from '../../../../models/PartnerModel';
import { Partner } from '../../../../Schemas/Partner';

class SavePartnerService {
  async execute(partner: Partner): Promise<void> {
    await PartnerModel.findByIdAndUpdate(
      partner.id,
      {
        ...partner,
      },
      {
        useFindAndModify: false,
      },
    );
  }
}

export { SavePartnerService };
