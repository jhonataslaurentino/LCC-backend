import CompanyModel from '../../Entities/Company';
import AppError from '../../errors/AppError';

interface Request {
  recurrence_code: number;
}

class HandleSubscriptionSuspendedService {
  public async execute({ recurrence_code }: Request): Promise<void> {
    const company = await CompanyModel.findOne({
      eduzzRecurrenceCode: recurrence_code,
    });
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    company.isSuspended = true;
    await company.save();
  }
}

export default HandleSubscriptionSuspendedService;
