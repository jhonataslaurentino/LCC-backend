import AppError from '../../../../errors/AppError';
import { BitrixCompany } from '../../models/BitrixCompany';
import { IBitrixCompanyRepository } from '../../repositories/IBitrixCompanyRepository';

class FindBitrixCompanyByEmailUseCase {
  constructor(private bitrixCompanyRepository: IBitrixCompanyRepository) {}

  async execute(email: string): Promise<BitrixCompany> {
    const bitrixCompany = await this.bitrixCompanyRepository.findByEmail(email);
    if (!bitrixCompany) {
      throw new AppError('There are not any company with this email');
    }
    return bitrixCompany;
  }
}

export { FindBitrixCompanyByEmailUseCase };
