import { ICompanyRepository } from '../../../company/repositories/ICompanyRepository';
import { IBitrixCompanyRepository } from '../../repositories/IBitrixCompanyRepository';

class UpdateAllBitrixCompaniesCPFCNPJSUseCase {
  constructor(
    private companiesRepository: ICompanyRepository,
    private bitrixCompaniesRepository: IBitrixCompanyRepository,
  ) {}

  async execute(): Promise<void> {
    const companies = await this.companiesRepository.list();
    companies.forEach(async company => {
      const bitrixCompany = await this.bitrixCompaniesRepository.findById(
        String(company.bitrix_id),
      );
      await this.bitrixCompaniesRepository.updateField({
        id: String(bitrixCompany.ID),
        UF_CRM_1602185703: company.cpf_cnpj,
        PHONE: [{ VALUE: company.phone, VALUE_TYPE: 'WORK' }],
      });
    });
  }
}

export { UpdateAllBitrixCompaniesCPFCNPJSUseCase };
