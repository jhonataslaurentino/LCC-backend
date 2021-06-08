import AppError from '../../../../errors/AppError';
import { IBitrixCompanyRepository } from '../../repositories/IBitrixCompanyRepository';

interface IRequest {
  name: string;
  email: string;
  phone: string;
  cpf_cnpj: string;
}

class CreateBitrixCompanyUseCase {
  constructor(private bitrixCompanyRepository: IBitrixCompanyRepository) {}

  async execute({ email, name, phone, cpf_cnpj }: IRequest): Promise<number> {
    const companyAlreadyExists = await this.bitrixCompanyRepository.findByEmail(
      email,
    );
    if (companyAlreadyExists) {
      throw new AppError('Company already exists at bitrix repository');
    }
    const company = await this.bitrixCompanyRepository.createBitrixCompany({
      email,
      name,
      phone,
      cpf_cnpj,
    });
    return company;
  }
}

export { CreateBitrixCompanyUseCase };
