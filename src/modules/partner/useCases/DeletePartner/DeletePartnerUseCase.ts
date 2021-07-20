import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';

class DeletePartnerUseCase {
  constructor(private partnersRepository: IPartnerRepository) {}

  async execute(id: string): Promise<Partner> {
    const deletedPartner = await this.partnersRepository.delete(id);
    return deletedPartner;
  }
}

export { DeletePartnerUseCase };
