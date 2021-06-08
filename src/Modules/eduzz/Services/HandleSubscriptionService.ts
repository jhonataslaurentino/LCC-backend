import HandleOverdueSubscriptionService from './HandleOverdueSubscriptionService';
import HandleSubscriptionCanceledService from './HandleSubscriptionCanceledService';
import HandleSubscriptionSuspendedService from './HandleSubscriptionSuspendedService';
import HandleTrialSubscriptionService from './HandleTrialSubscriptionService';
import HandleUpToDateRecurrenceService from './HandleUpToDateRecurrenceService';

interface Request {
  recurrence_status: number;
  recurrence_code: number;
  customerName: string;
  customerEmail: string;
  bill_id: number;
}

class HandleSubscriptionService {
  public async execute({
    recurrence_status,
    recurrence_code,
    customerEmail,
    customerName,
    bill_id,
  }: Request): Promise<void> {
    // Em dias
    if (recurrence_status === 1) {
      const handleUpToDateRecurrenceService = new HandleUpToDateRecurrenceService();
      await handleUpToDateRecurrenceService.execute({
        customerEmail,
        customerName,
        recurrence_code,
        bill_id,
      });
    }
    // Suspenso
    if (recurrence_status === 3) {
      const handleSubscriptionSuspendedService = new HandleSubscriptionSuspendedService();
      await handleSubscriptionSuspendedService.execute({
        recurrence_code,
      });
    }
    // Cancelado
    if (recurrence_status === 4) {
      const handleSubscriptionCanceledService = new HandleSubscriptionCanceledService();
      await handleSubscriptionCanceledService.execute({
        recurrence_code,
      });
    }
    // Atrasado
    if (recurrence_status === 7) {
      const handleOverdueSubscriptionService = new HandleOverdueSubscriptionService();
      await handleOverdueSubscriptionService.execute({
        recurrence_code,
      });
    }
    // TODO: Handle finished

    // Trial subscription
    if (recurrence_status === 10) {
      const handleTrialSubscriptionService = new HandleTrialSubscriptionService();
      await handleTrialSubscriptionService.execute({
        customerEmail,
        customerName,
        recurrence_code,
        bill_id,
      });
    }
  }
}

export default HandleSubscriptionService;
