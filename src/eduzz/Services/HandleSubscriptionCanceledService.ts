import CompanyModel from '../../Entities/Company';

interface Request {
  recurrence_code: number;
}

class HandleSubscriptionCanceledService {
  public async execute({ recurrence_code }: Request): Promise<void> {
    await CompanyModel.findOneAndDelete({
      eduzzRecurrenceCode: recurrence_code,
    });
  }
}

export default HandleSubscriptionCanceledService;
