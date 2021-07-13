import { CompanyRepository } from '../../repositories/implementations/CompanyRepository/CompanyRepository';
import { AuthenticateCompanyUseCase } from './AuthenticateCompanyUseCase';

const companiesRepository = new CompanyRepository();
const authenticateCompanyUseCase = new AuthenticateCompanyUseCase(
  companiesRepository,
);
export { authenticateCompanyUseCase };
