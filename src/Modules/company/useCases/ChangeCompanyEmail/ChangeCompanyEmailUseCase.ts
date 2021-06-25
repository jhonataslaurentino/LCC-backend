import AppError from '../../../../errors/AppError';
import { IBitrixCompanyRepository } from '../../../Bitrix/repositories/IBitrixCompanyRepository';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';
import Company from '../../schemas/Company';

interface IChangeCompanyEmailDTO {
  companyID: string;
  newEmail: string;
}

class ChangeCompanyEmailUseCase {
  constructor(
    private companiesRepository: ICompanyRepository,
    private bitrixCompaniesRepository: IBitrixCompanyRepository,
  ) {}

  async execute({
    companyID,
    newEmail,
  }: IChangeCompanyEmailDTO): Promise<Company> {
    const companyAlreadyExists = await this.companiesRepository.findByEmail(
      newEmail,
    );
    if (companyAlreadyExists) {
      throw new AppError('Email already used!', 400);
    }
    const company = await this.companiesRepository.changeCompanyEmail({
      companyID,
      newEmail,
    });
    await this.bitrixCompaniesRepository.updateField({
      id: String(company.bitrix_id),
      EMAIL: [
        {
          VALUE_TYPE: 'WORK',
          VALUE: newEmail,
        },
      ],
    });
    return company;
  }
}

export { ChangeCompanyEmailUseCase };
