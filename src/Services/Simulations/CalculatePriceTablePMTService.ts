interface Request {
  loanInterest: number;
  numberOfInstallments: number;
  loanAmount: number;
}

class CalculatePriceTablePMTService {
  public execute({
    loanInterest,
    numberOfInstallments,
    loanAmount,
  }: Request): number {
    const x = (1 + loanInterest) ** numberOfInstallments;
    const fixedInstallment = loanAmount * loanInterest;
    const PMT = fixedInstallment * (x / (x - 1));
    return PMT;
  }
}

export default CalculatePriceTablePMTService;
