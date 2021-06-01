import { resolve } from 'path';
import { SendMailService } from '../../global/SendMailService';
import CreateCompanyService from './CreateCompanyService';
import { CreateCompanyTokenService } from './CreateCompanyTokenService';
import { GenerateRandomPasswordService } from './GenerateRandomPasswordService';

interface Request {
  email: string;
  name: string;
  eduzzBillID: number;
}

class HandlePaidBillService {
  public async execute({ email, name, eduzzBillID }: Request): Promise<void> {
    const createCompanyService = new CreateCompanyService();
    const createCompanyTokenService = new CreateCompanyTokenService();
    const companyToken = createCompanyTokenService.execute({
      eduzzBillID,
      timeToExpireToken: '365d',
      recurrence_code: 0,
    });
    const generateRandomPasswordService = new GenerateRandomPasswordService();
    const randomPassword = generateRandomPasswordService.execute({});
    await createCompanyService.execute({
      name,
      email,
      password: randomPassword,
      cpf_cnpj: '',
      personName: name,
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
        name,
        email,
        password: randomPassword,
      },
      subject: 'Seja bem vindo(a)!',
      to: email,
    });
  }
}
export default HandlePaidBillService;
