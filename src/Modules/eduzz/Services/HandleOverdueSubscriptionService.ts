import CompanyModel from '../../../Entities/Company';
import AppError from '../../../errors/AppError';

interface Request {
  recurrence_code: number;
}

class HandleOverdueSubscriptionService {
  public async execute({ recurrence_code }: Request): Promise<void> {
    // TODO: send email
    const company = await CompanyModel.findOne({
      eduzzRecurrenceCode: recurrence_code,
    });
    if (!company) {
      throw new AppError('Company not found', 404);
    }
    company.isSuspended = true;
    await company.save();
  }
}

export default HandleOverdueSubscriptionService;
