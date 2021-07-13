import { CompanyRepository } from '../../../company/repositories/implementations/CompanyRepository/CompanyRepository';
import { BitrixCompanyRepository } from '../../repositories/Implementations/BitrixCompanyRepository/BitrixCompanyRepository';
import { UpdateAllBitrixCompaniesCPFCNPJSUseCase } from './UpdateAllBitrixCompaniesCPFCNPJSUseCase';

const companiesRepository = new CompanyRepository();
const bitrixCompaniesRepository = new BitrixCompanyRepository();
const updateAllBitrixCompaniesCPFCNPJSUseCase = new UpdateAllBitrixCompaniesCPFCNPJSUseCase(
  companiesRepository,
  bitrixCompaniesRepository,
);

export { updateAllBitrixCompaniesCPFCNPJSUseCase };
