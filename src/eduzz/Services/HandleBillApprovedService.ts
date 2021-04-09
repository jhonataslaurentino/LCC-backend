import SendEmailToCreateCompanyService from '../../Services/SendEmailToCreateCompanyService';

interface Request {
  customer_name: string;
  customer_email: string;
}

class HandleBillApprovedService {
  public async execute({
    customer_name,
    customer_email,
  }: Request): Promise<void> {
    const sendEmailToCreateCompanyService = new SendEmailToCreateCompanyService();
    await sendEmailToCreateCompanyService.execute({
      email: customer_email,
      name: customer_name,
      template: 'SignUpEduzz',
    });
  }
}

export default HandleBillApprovedService;
