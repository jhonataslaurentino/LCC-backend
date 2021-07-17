import { sign } from 'jsonwebtoken';
import { resolve } from 'path';
import authConfig from '../../../../../config/authConfig';
import AppError from '../../../../../errors/AppError';
import { IPartnerRepository } from '../../../repositories/IPartnerRepository';
import { Partner } from '../../../Schemas/Partner';
import endpoints from '../../../../../config/endpoints.config';
import { SendPartnerMailService } from '../../../Utils/SendPartnerMailService';

class RequestPartnerRecoverPasswordUseCase {
  constructor(private partnersRepository: IPartnerRepository) {}

  async execute(email: string): Promise<void> {
    const partner = await this.partnersRepository.findByEmail(email);
    if (!partner) {
      throw new AppError('Partner not found', 404);
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: partner.id,
      expiresIn,
    });
    const mailPath = resolve(
      '.',
      'src',
      'views',
      'emails',
      'partner',
      'recoverPassword.hbs',
    );
    const sendPartnerMailService = new SendPartnerMailService();
    const isAMasterPartner = !partner.createdBy;
    const partnerMaster = isAMasterPartner
      ? partner
      : (partner.createdBy as Partner);
    await sendPartnerMailService.execute({
      path: mailPath,
      variables: {
        name: partner.name,
        link: `${partnerMaster.siteURL}/recuperar-senha/${token}`,
        logo: `${endpoints.backendURL}/partner/platform/logo/${partnerMaster.id}`,
        primaryColor: partnerMaster.primaryColor,
      },
      subject: 'Redefinição de senha',
      to: partner.email,
      from: `${partnerMaster.companyName} <${partnerMaster.email}>`,
    });
  }
}

export { RequestPartnerRecoverPasswordUseCase };
