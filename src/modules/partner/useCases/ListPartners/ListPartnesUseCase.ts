import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';

class ListPartnersUseCase {
  constructor(private partnersRepository: IPartnerRepository) {}

  async execute(): Promise<Partner[]> {
    const partners = await this.partnersRepository.list();
    return partners;
  }
}

export { ListPartnersUseCase };
