import AppError from '../../../../errors/AppError';
import { IBitrixDriveRepository } from '../../../Bitrix/repositories/IBitrixDriveRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';
import { PartnerStyleSchema } from './PartnerStyleSchema';

interface IRequest {
  partnerID: string;
}

class GetPartnerStyleUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private bitrixDriveRepository: IBitrixDriveRepository,
  ) {}

  async execute({ partnerID }: IRequest): Promise<PartnerStyleSchema> {
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    if (!partner.createdBy) {
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
    const partnerMaster = partner.createdBy as Partner;
    const logoURL = await this.bitrixDriveRepository.getFile(
      String(partnerMaster.logoBitrixFileID),
    );
    return {
      logoURL,
      primaryColor: partnerMaster.primaryColor,
      secondaryColor: partnerMaster.secondaryColor,
    };
  }
}

export { GetPartnerStyleUseCase };
