import SendEmailToCreateCompanyService from './SendEmailToCreateCompanyService';

interface Request {
  email: string;
  name: string;
  eduzzBillID: number;
}

class HandlePaidBillService {
  public async execute({ email, name, eduzzBillID }: Request): Promise<void> {
    const sendEmailToCreateCompanyService = new SendEmailToCreateCompanyService();
    await sendEmailToCreateCompanyService.execute({
      eduzzBillID,
      email,
      name,
      template: 'SignUp',
      timeToExpireToken: '365d',
    });
  }
}
export default HandlePaidBillService;
