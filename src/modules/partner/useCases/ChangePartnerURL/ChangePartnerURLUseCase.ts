import AppError from '../../../../errors/AppError';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';

interface IRequest {
  partnerID: string;
  url: string;
}

class ChangePartnerURLUseCase {
  constructor(private partnersRepository: IPartnerRepository) {}

  async execute({ partnerID, url }: IRequest): Promise<Partner> {
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const partners = (await this.partnersRepository.list()) as Partner[];
    const urlList = partners.map(({ siteURL }) => siteURL);
    if (urlList.includes(url)) {
      throw new AppError('Site url already used');
    }

    partner.siteURL = url;
    const changedPartner = await this.partnersRepository.changePartnerURL({
      partnerID,
      url,
    });
    return changedPartner;
  }
}

export { ChangePartnerURLUseCase };
