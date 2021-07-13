import { IBCBRepository } from '../../repositories/IBCBRepository';
import { SELIC } from '../../schemas/selic';

class GetCurrentSELICRateUseCase {
  constructor(private bcbRepository: IBCBRepository) {}

  async execute(): Promise<SELIC> {
    const selicRate = await this.bcbRepository.getCurrentSELICRate();
    return selicRate;
  }
}

export { GetCurrentSELICRateUseCase };
