import { ICompanyRepository } from '../../../../../../repositories/ICompanyRepository';

class OverdueBillUseCase {
  constructor(private companiesRepository: ICompanyRepository) {}

  async execute(recurrence_code: number): Promise<void> {
    const company = await this.companiesRepository.findByEduzzRecurrenceCode(
      recurrence_code,
    );
    await this.companiesRepository.suspend(company.id);
  }
}

export { OverdueBillUseCase };
