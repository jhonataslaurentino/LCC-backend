import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';

class GetPartnerUseCase {
  constructor(private partnersRepository: IPartnerRepository) {}

  async execute(partnerID: string): Promise<Partner> {
    const partner = await this.partnersRepository.findById(partnerID);
    return partner;
  }
}

export { GetPartnerUseCase };
