import { compare, hash } from 'bcryptjs';
import AppError from '../../../../errors/AppError';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';

interface IChangePartnerPasswordDTO {
  partnerID: string;
  oldPassword: string;
  newPassword: string;
}

class ChangePartnerPasswordUseCase {
  constructor(private partnersRepository: IPartnerRepository) {}

  async execute({
    newPassword,
    oldPassword,
    partnerID,
  }: IChangePartnerPasswordDTO): Promise<Partner> {
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }

    const isPasswordMatched = await compare(oldPassword, partner.password);
    if (!isPasswordMatched) {
      throw new AppError('Incorrect password', 401);
    }

    const hashedPassword = await hash(newPassword, 8);
    partner.password = hashedPassword;
    await this.partnersRepository.save(partner);
    return partner;
  }
}

export { ChangePartnerPasswordUseCase };
