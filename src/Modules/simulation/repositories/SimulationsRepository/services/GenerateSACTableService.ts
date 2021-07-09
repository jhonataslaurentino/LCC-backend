import Installment from '../../../schemas/Installment';

interface IRequest {
  loanAmount: number;
  numberOfInstallments: number;
  loanInterest: number;
}

interface ICalculateSACTablePMTDTO {
  amortization: number;
  loanInterest: number;
  loanAmount: number;
  currentInstallment: number;
}

class GenerateSACTableSimulationService {
  public calculateSACTablePMT({
    amortization,
    currentInstallment,
    loanAmount,
    loanInterest,
  }: ICalculateSACTablePMTDTO): number {
    const pmt =
      amortization * (1 - (currentInstallment - 1) * loanInterest) +
      loanAmount * loanInterest;
    return pmt;
  }

  public execute({
    loanAmount,
    loanInterest,
    numberOfInstallments,
  }: IRequest): Installment[] {
    const installments = [] as Installment[];
    const amortization = loanAmount / numberOfInstallments;
    let currentAmount = loanAmount - amortization;
    for (let k = 1; k <= numberOfInstallments; k += 1) {
      const pmt = this.calculateSACTablePMT({
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

export { GenerateSACTableSimulationService };
