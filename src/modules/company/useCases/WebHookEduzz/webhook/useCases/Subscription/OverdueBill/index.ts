import { CompanyRepository } from '../../../../../../repositories/implementations/CompanyRepository/CompanyRepository';
import { OverdueBillUseCase } from './OverdueBillUseCase';

const companiesRepository = new CompanyRepository();
const overdueBillUseCase = new OverdueBillUseCase(companiesRepository);

export { overdueBillUseCase };
