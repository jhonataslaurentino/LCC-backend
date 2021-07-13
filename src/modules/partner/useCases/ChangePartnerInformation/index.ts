import { BitrixCompanyRepository } from '../../../Bitrix/repositories/Implementations/BitrixCompanyRepository/BitrixCompanyRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { ChangePartnerInformationUseCase } from './ChangePartnerInformationUseCase';

const partnersRepository = new PartnerRepository();
const bitrixCompaniesRepository = new BitrixCompanyRepository();
const changePartnerInformationUseCase = new ChangePartnerInformationUseCase(
  partnersRepository,
  bitrixCompaniesRepository,
);

export { changePartnerInformationUseCase };
