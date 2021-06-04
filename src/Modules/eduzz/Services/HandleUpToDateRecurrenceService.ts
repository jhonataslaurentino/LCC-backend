import { resolve } from 'path';
import { CompanyModel } from '../../company/models/Company';
import { SendMailService } from '../../global/SendMailService';
import CreateCompanyService from './CreateCompanyService';
import { CreateCompanyTokenService } from './CreateCompanyTokenService';
import { GenerateRandomPasswordService } from './GenerateRandomPasswordService';

interface Request {
  recurrence_code: number;
  customerName: string;
  customerEmail: string;
  bill_id: number;
}

class HandleUpToDateRecurrenceService {
  public async execute({
    recurrence_code,
    customerName,
    customerEmail,
    bill_id,
  }: Request): Promise<void> {
    const companyAlreadyExists = await CompanyModel.findOne({
      eduzzRecurrenceCode: recurrence_code,
    });
    const createCompanyTokenService = new CreateCompanyTokenService();
    const createdToken = createCompanyTokenService.execute({
      recurrence_code,
      eduzzBillID: bill_id,
      timeToExpireToken: '31d',
    });

    if (!companyAlreadyExists) {
      const createCompanyService = new CreateCompanyService();
      const generateRandomPasswordService = new GenerateRandomPasswordService();
      const randomPassword = generateRandomPasswordService.execute({});
      await createCompanyService.execute({
        name: customerName,
        email: customerEmail,
        password: randomPassword,
        cpf_cnpj: '',
        personName: customerName,
        token: createdToken,
      });
      const mailPath = resolve(
        __dirname,
        '..',
        '..',
        'views',
        'emails',
        'EduzzSignUp',
      );
      const sendMailService = new SendMailService();
      await sendMailService.execute({
        path: mailPath,
        variables: {
          name: customerName,
          email: customerEmail,
          password: randomPassword,
        },
        subject: 'Seja bem vindo(a)!',
        to: customerEmail,
      });
    }
    companyAlreadyExists.accessToken = createdToken;
    await companyAlreadyExists.save();
  }
}

export default HandleUpToDateRecurrenceService;
