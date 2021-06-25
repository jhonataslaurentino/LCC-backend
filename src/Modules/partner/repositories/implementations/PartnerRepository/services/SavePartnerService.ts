import { DocumentType } from '@typegoose/typegoose';
import { Partner } from '../../../../Schemas/Partner';

class SavePartnerService {
  async execute(partner: Partner): Promise<void> {
    const partnerDocument = partner as DocumentType<Partner>;
    await partnerDocument.save();
  }
}

export { SavePartnerService };
