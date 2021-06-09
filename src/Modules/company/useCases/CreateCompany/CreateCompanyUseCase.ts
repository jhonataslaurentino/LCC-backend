import { resolve } from 'path';
import { IBitrixCompanyRepository } from '../../../Bitrix/repositories/IBitrixCompanyRepository';
import { SendMailService } from '../../../global/SendMailService';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';
import { IRoleRepository } from '../../repositories/IRoleRepository';
import Company from '../../schemas/Company';
import { getDefaultRoleForCompanyByEmailUseCase } from '../GetDefaultRoleForCompanyByEmail';

interface IMailVariablesDTO {
  [key: string]: number | string | Date;
}
interface IMailOptionsDTO {
  mailPath: string;
  variables?: IMailVariablesDTO;
  subject: string;
  to: string;
}

interface IRequest {
  eduzzBillID: number;
  recurrence_code: number;
  timeToExpireToken: string;
  cpf_cnpj: string;
  password?: string;
  email: string;
  name: string;
  personName?: string;
  phone: string;
  userName?: string;
  sendMail?: boolean;
  mailOptions?: IMailOptionsDTO;
}

class CreateCompanyUseCase {
  constructor(
    private companiesRepository: ICompanyRepository,
    private bitrixCompaniesRepository: IBitrixCompanyRepository,
    private rolesRepository: IRoleRepository,
  ) {}

  async execute({
    cpf_cnpj,
    eduzzBillID,
    email,
    name,
    phone,
    recurrence_code,
    timeToExpireToken,
    password,
    personName,
    userName,
    sendMail = false,
  }: IRequest): Promise<Company> {
    const accessToken = this.companiesRepository.createCompanyToken({
      eduzzBillID,
      recurrence_code: recurrence_code || 0,
      timeToExpireToken,
    });
    const createdBitrixCompanyID = await this.bitrixCompaniesRepository.createBitrixCompany(
      {
        cpf_cnpj,
        email,
        name,
        phone,
      },
    );
    const role = await getDefaultRoleForCompanyByEmailUseCase.execute(email);
    const companyPassword =
      password || this.companiesRepository.generateRandomPassword({});
    const company = await this.companiesRepository.create({
      accessToken,
      bitrix_id: String(createdBitrixCompanyID),
      cpf_cnpj,
      eduzzBillID: String(eduzzBillID),
      email,
      name,
      password: companyPassword,
      personName: personName || name,
      phone,
      roleID: role.id,
      userName: userName || '',
      eduzzRecurrenceCode: recurrence_code || 0,
    });

    if (sendMail) {
      const mailPath = resolve(
        '.',
        'src',
        'views',
        'emails',
        'EduzzSignUp.hbs',
      );
      const sendMailService = new SendMailService();
      await sendMailService.execute({
        path: mailPath,
        variables: {
          name,
          email: company.email,
          password: companyPassword,
          logo_url: 'https://api.lucrandocomcredito.com.br/LCC/logo',
        },
        subject: 'Seja bem vindo(a)!',
        to: company.email,
      });
    }

    return company;
  }
}

export { CreateCompanyUseCase };
