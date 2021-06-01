import { resolve } from 'path';
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

class HandleTrialSubscriptionService {
  public async execute({
    recurrence_code,
    bill_id,
    customerEmail,
    customerName,
  }: Request): Promise<void> {
    const createCompanyService = new CreateCompanyService();
    const createCompanyTokenService = new CreateCompanyTokenService();
    const companyToken = createCompanyTokenService.execute({
      recurrence_code,
      eduzzBillID: bill_id,
      timeToExpireToken: '7d',
    });
    const generateRandomPasswordService = new GenerateRandomPasswordService();
    const randomPassword = generateRandomPasswordService.execute({});
    await createCompanyService.execute({
      name: customerName,
      email: customerEmail,
      password: randomPassword,
      cpf_cnpj: '',
      personName: customerName,
      token: companyToken,
    });
    const mailPath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'views',
      'emails',
      'EduzzSignUp.hbs',
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
}

export default HandleTrialSubscriptionService;
