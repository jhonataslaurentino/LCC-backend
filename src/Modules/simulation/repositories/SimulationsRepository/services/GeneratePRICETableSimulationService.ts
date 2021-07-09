import Installment from '../../../schemas/Installment';

interface IRequest {
  loanAmount: number;
  numberOfInstallments: number;
  loanInterest: number;
}

class GeneratePRICETableSimulationService {
  public calculatePriceTablePMT({
    loanAmount,
    loanInterest,
    numberOfInstallments,
  }: IRequest): number {
    const x = (1 + loanInterest) ** numberOfInstallments;
    const fixedInstallment = loanAmount * loanInterest;
    const PMT = fixedInstallment * (x / (x - 1));
    return PMT;
  }

  public execute({
    loanAmount,
    numberOfInstallments,
    loanInterest,
  }: IRequest): Installment[] {
    const installments = [] as Installment[];
    const PMT = this.calculatePriceTablePMT({
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

export { GeneratePRICETableSimulationService };
