import { hash } from 'bcryptjs';
import CompanyModel from '../Entities/Company';
import Company from '../Schemas/Company';

interface Request {
  name: string;
  personName: string;
  email: string;
  password: string;
  cpf_cnpj: string;
  bitrix_id?: number;
}

class CreateCompanyService {
  public async execute({
    name,
    personName,
    email,
    password,
    cpf_cnpj,
    bitrix_id,
  }: Request): Promise<Company> {
    const isThereAnyCompanyWithSameEmail = await CompanyModel.findOne({
      email,
    }).exec();

    if (isThereAnyCompanyWithSameEmail) {
      throw new Error('This email is already used');
    }

    const hashedPassword = await hash(password, 8);

    const company = (
      await CompanyModel.create({
        name,
        personName,
        email,
        password: hashedPassword,
        cpf_cnpj,
        bitrix_id,
      })
    ).save();
    return company;
  }
}

export default CreateCompanyService;
