import { CompanyRepository } from '../../../repositories/implementations/CompanyRepository/CompanyRepository';
import { SendMailToCreateCompanyUseCase } from './SendMailToCreateCompanyUseCase';

const companiesRepository = new CompanyRepository();
const sendMailToCreateCompanyUseCase = new SendMailToCreateCompanyUseCase(
  companiesRepository,
);

export { sendMailToCreateCompanyUseCase };
