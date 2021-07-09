import AppError from '../../../../errors/AppError';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { PartnerInformationSchema } from './PartnerInformationSchema';

class GetPartnerInformationUseCase {
  constructor(private partnersRepository: IPartnerRepository) {}

  async execute(partnerID: string): Promise<PartnerInformationSchema> {
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const { id, companyName, name } = partner;
    return {
      id,
      companyName,
      name,
    };
  }
}

export { GetPartnerInformationUseCase };
