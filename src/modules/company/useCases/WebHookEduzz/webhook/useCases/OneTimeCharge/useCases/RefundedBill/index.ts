import { CompanyRepository } from '../../../../../../../repositories/implementations/CompanyRepository/CompanyRepository';
import { RefundedBillUseCase } from './RefundedBillUseCase';

const companiesRepository = new CompanyRepository();
const refundedBullUseCase = new RefundedBillUseCase(companiesRepository);
export { refundedBullUseCase };
