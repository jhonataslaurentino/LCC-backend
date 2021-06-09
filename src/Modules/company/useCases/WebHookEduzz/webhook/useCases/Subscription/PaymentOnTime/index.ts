import { CompanyRepository } from '../../../../../../repositories/implementations/CompanyRepository/CompanyRepository';
import { PaymentOnTimeUseCase } from './PaymentoOnTimeUseCase';

const companiesRepository = new CompanyRepository();
const paymentOnTimeUseCase = new PaymentOnTimeUseCase(companiesRepository);

export { paymentOnTimeUseCase };
