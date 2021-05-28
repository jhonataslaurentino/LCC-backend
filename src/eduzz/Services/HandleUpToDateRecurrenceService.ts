import CompanyModel from '../../Entities/Company';
import SendEmailToCreateCompanyService from './SendEmailToCreateCompanyService';

interface Request {
  recurrence_code: number;
  customerName: string;
  customerEmail: string;
}

class HandleUpToDateRecurrenceService {
  public async execute({
    recurrence_code,
    customerName,
    customerEmail,
  }: Request): Promise<void> {
    const company = await CompanyModel.findOne({
      eduzzRecurrenceCode: recurrence_code,
    });
    if (!company) {
      const sendEmailToCreateCompanyService = new SendEmailToCreateCompanyService();
      await sendEmailToCreateCompanyService.execute({
        email: customerEmail,
        name: customerName,
        template: 'SignUp',
        timeToExpireToken: '31d',
        recurrence_code,
      });
    }
  }
}

export default HandleUpToDateRecurrenceService;
