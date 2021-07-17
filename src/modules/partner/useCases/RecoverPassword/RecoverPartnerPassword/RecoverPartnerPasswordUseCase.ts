import { verify } from 'jsonwebtoken';
import authConfig from '../../../../../config/authConfig';
import AppError from '../../../../../errors/AppError';
import { TokenPayload } from '../../../../../Services/RecoverPasswordService';
import { IPartnerRepository } from '../../../repositories/IPartnerRepository';
import { Partner } from '../../../Schemas/Partner';

interface IRequest {
  token: string;
  newPassword: string;
}

class RecoverPartnerPasswordUseCase {
  constructor(private partnersRepository: IPartnerRepository) {}

  async execute({ newPassword, token }: IRequest): Promise<Partner> {
    try {
      const tokenDecoded = verify(token, authConfig.jwt.secret);
      const { sub: partnerID } = tokenDecoded as TokenPayload;
      const changedPartner = await this.partnersRepository.changePartnerPassword(
        {
          partnerID,
          newPassword,
        },
      );
      return changedPartner;
    } catch {
      throw new AppError('Invalid JWT token');
    }
  }
}

export { RecoverPartnerPasswordUseCase };
