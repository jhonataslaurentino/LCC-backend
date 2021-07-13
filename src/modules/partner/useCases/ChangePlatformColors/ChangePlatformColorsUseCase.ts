import AppError from '../../../../errors/AppError';
import { IBitrixDriveRepository } from '../../../Bitrix/repositories/IBitrixDriveRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { PartnerStyleSchema } from '../GetPartnerStyle/PartnerStyleSchema';

interface IChangePlatformColorUseCase {
  partnerID: string;
  primaryColor: string;
  secondaryColor: string;
}

class ChangePlatformColorUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private bitrixDriveRepository: IBitrixDriveRepository,
  ) {}

  async execute({
    partnerID,
    primaryColor,
    secondaryColor,
  }: IChangePlatformColorUseCase): Promise<PartnerStyleSchema> {
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    partner.primaryColor = primaryColor;
    partner.secondaryColor = secondaryColor;
    await this.partnersRepository.save(partner);
    const logoURL = !partner.logoBitrixFileID
      ? ''
      : await this.bitrixDriveRepository.getFile(
          String(partner.logoBitrixFileID),
        );
    return {
      logoURL,
      primaryColor: partner.primaryColor,
      secondaryColor: partner.secondaryColor,
    };
  }
}

export { ChangePlatformColorUseCase };
