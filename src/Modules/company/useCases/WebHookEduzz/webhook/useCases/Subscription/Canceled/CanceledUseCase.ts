import { ICompanyRepository } from '../../../../../../repositories/ICompanyRepository';

class CanceledUseCase {
  constructor(private companiesRepository: ICompanyRepository) {}

  async execute(recurrence_cod: number): Promise<void> {
    const company = await this.companiesRepository.findByEduzzRecurrenceCode(
      recurrence_cod,
    );
    await this.companiesRepository.suspend(company.id);
  }
}

export { CanceledUseCase };
