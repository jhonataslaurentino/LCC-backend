import { CompanyRepository } from '../../../repositories/implementations/CompanyRepository/CompanyRepository';
import { RecoverPasswordUseCase } from './RecoverPasswordUseCase';

const companiesRepository = new CompanyRepository();
const recoverPasswordUseCase = new RecoverPasswordUseCase(companiesRepository);
export { recoverPasswordUseCase };
