import { CompanyModel } from '../../company/models/Company';

interface Request {
  recurrence_code: number;
}

class HandleSubscriptionCanceledService {
  public async execute({ recurrence_code }: Request): Promise<void> {
    // TODO: Change it to suspended user
    await CompanyModel.findOneAndDelete({
      eduzzRecurrenceCode: recurrence_code,
    });
  }
}

export default HandleSubscriptionCanceledService;
