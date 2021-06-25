import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../../config/authConfig';
import AppError from '../../../../errors/AppError';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';

interface IAuthenticatePartnerUseCase {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  partner: Partner;
}

class AuthenticatePartnerUseCase {
  constructor(private partnersRepository: IPartnerRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticatePartnerUseCase): Promise<IResponse> {
    const partner = await this.partnersRepository.findByEmail(email);
    if (!partner) {
      throw new AppError('Incorrect email/password combination', 404);
    }
    if (partner.isSuspended) {
      throw new AppError('Company suspended', 401);
    }
    const isPasswordMatched = await compare(password, partner.password);
    if (!isPasswordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: partner.id,
      expiresIn,
    });
    return {
      partner,
      token,
    };
  }
}

export { AuthenticatePartnerUseCase };
