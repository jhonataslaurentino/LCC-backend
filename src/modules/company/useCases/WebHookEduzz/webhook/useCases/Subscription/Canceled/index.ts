import { CompanyRepository } from '../../../../../../repositories/implementations/CompanyRepository/CompanyRepository';
import { CanceledUseCase } from './CanceledUseCase';

const companiesRepository = new CompanyRepository();
const canceledUseCase = new CanceledUseCase(companiesRepository);

export { canceledUseCase };
