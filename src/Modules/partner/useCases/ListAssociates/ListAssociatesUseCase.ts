import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';

class ListPartnerAssociatesUseCase {
  constructor(private partnersRepository: IPartnerRepository) {}

  async execute(partnerID: string): Promise<Partner[]> {
    const partners = await this.partnersRepository.listAssociates(partnerID);
    return partners;
  }
}

export { ListPartnerAssociatesUseCase };
