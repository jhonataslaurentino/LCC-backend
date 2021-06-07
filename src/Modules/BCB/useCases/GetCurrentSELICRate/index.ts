import { BCBRepository } from '../../repositories/Implementations/BCBRepository';
import { GetCurrentSELICRateUseCase } from './GetCurrentSELICRateUseCase';

const bcbRepository = new BCBRepository();
const getCurrentSELICRateUseCase = new GetCurrentSELICRateUseCase(
  bcbRepository,
);
export { getCurrentSELICRateUseCase };
