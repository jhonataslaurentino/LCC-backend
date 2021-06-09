import { CompanyRepository } from '../../../../../../repositories/implementations/CompanyRepository/CompanyRepository';
import { SuspendedUseCase } from './SuspendedUseCase';

const companiesRepository = new CompanyRepository();
const suspendedUseCase = new SuspendedUseCase(companiesRepository);

export { suspendedUseCase };
