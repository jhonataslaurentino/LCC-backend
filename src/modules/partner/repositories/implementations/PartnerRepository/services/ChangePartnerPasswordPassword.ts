import { hash } from 'bcryptjs';
import AppError from '../../../../../../errors/AppError';
import { PartnerModel } from '../../../../models/PartnerModel';
import { Partner } from '../../../../Schemas/Partner';
import { IChangePartnerPassword } from '../../../IPartnerRepository';

class ChangePartnerPasswordPassword {
  async execute({
    newPassword,
    partnerID,
  }: IChangePartnerPassword): Promise<Partner> {
    const partner = await PartnerModel.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const hashedPassword = await hash(newPassword, 8);
    partner.password = hashedPassword;
    await partner.save();
    return partner;
  }
}

export { ChangePartnerPasswordPassword };
