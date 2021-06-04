import { BCBRepository } from '../../repositories/Implementations/BCBRepository';
import { GetCurrentSELICRateUseCase } from './GetCurrentSELICRateUseCase';

const bcbRepository = BCBRepository.getInstance();
const getCurrentSELICRateUseCase = new GetCurrentSELICRateUseCase(
  bcbRepository,
);
export { getCurrentSELICRateUseCase };
