import SendEmailToCreateCompanyService from './SendEmailToCreateCompanyService';

interface Request {
  recurrence_code: number;
  customerName: string;
  customerEmail: string;
}

class HandleTrialSubscriptionService {
  public async execute({
    recurrence_code,
    customerEmail,
    customerName,
  }: Request): Promise<void> {
    const sendEmailToCreateCompanyService = new SendEmailToCreateCompanyService();
    await sendEmailToCreateCompanyService.execute({
      email: customerEmail,
      name: customerName,
      template: 'SignUp',
      timeToExpireToken: '7d',
      recurrence_code,
    });
  }
}

export default HandleTrialSubscriptionService;
