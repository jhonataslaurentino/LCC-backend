import CalculatePriceTablePMTService from './CalculatePriceTablePMTService';

interface Request {
  loanAmount: number;
  numberOfInstallments: number;
  loanInterest: number;
}

interface Installment {
  amortization: number;
  amount: number;
  interest: number;
  installment: number;
}

class GetPriceTableSimulationService {
  public execute({
    loanAmount,
    numberOfInstallments,
    loanInterest,
  }: Request): Installment[] {
    const installments = [] as Installment[];
    const calculatePriceTablePMTService = new CalculatePriceTablePMTService();
    const PMT = calculatePriceTablePMTService.execute({
      loanAmount,
      loanInterest,
      numberOfInstallments,
    });
    let currentAmount = loanAmount;
    let currentInterest = loanInterest * currentAmount;
    for (let i = 0; i < numberOfInstallments; i += 1) {
      const amortization = PMT - currentInterest;
      currentAmount -= amortization;
      installments.push({
        amortization,
        amount: currentAmount,
        interest: currentInterest,
        installment: PMT,
      });
      currentInterest = loanInterest * currentAmount;
    }
    return installments;
  }
}

export default GetPriceTableSimulationService;
