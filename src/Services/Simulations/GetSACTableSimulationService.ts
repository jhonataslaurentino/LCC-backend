import CalculateSACTablePMTService from './CalculateSACTablePMTService';

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

class GetSACTableSimulationService {
  public execute({
    loanAmount,
    numberOfInstallments,
    loanInterest,
  }: Request): Installment[] {
    const installments = [] as Installment[];
    const amortization = loanAmount / numberOfInstallments;
    const calculateSACTablePMTService = new CalculateSACTablePMTService();
    let currentAmount = loanAmount - amortization;
    for (let k = 1; k <= numberOfInstallments; k += 1) {
      const pmt = calculateSACTablePMTService.execute({
        amortization,
        currentInstallment: k,
        loanAmount,
        loanInterest,
      });
      const interest = pmt - amortization;
      installments.push({
        amortization,
        amount: currentAmount,
        interest,
        installment: pmt,
      });
      currentAmount -= amortization;
    }
    return installments;
  }
}

export default GetSACTableSimulationService;
