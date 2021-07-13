import { CompanyRepository } from '../../../repositories/implementations/CompanyRepository/CompanyRepository';
import { RequestRecoverPasswordUseCase } from './RequestRecoverPasswordUseCase';

const companiesRepository = new CompanyRepository();
const requestRecoverPasswordUseCase = new RequestRecoverPasswordUseCase(
  companiesRepository,
);
export { requestRecoverPasswordUseCase };
