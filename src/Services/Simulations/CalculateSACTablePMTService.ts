interface Request {
  amortization: number;
  loanInterest: number;
  loanAmount: number;
  currentInstallment: number;
}

class CalculateSACTablePMTService {
  public execute({
    amortization,
    loanAmount,
    loanInterest,
    currentInstallment,
  }: Request): number {
    const pmt =
      amortization * (1 - (currentInstallment - 1) * loanInterest) +
      loanAmount * loanInterest;
    return pmt;
  }
}

export default CalculateSACTablePMTService;
