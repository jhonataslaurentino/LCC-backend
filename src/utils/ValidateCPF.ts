interface validateCPFArgs {
  cpf: string;
}
const validateCPF = ({ cpf }: validateCPFArgs): boolean => {
  if (cpf === '00000000000') {
    return false;
  }
  let soma = 0;
  for (let i = 1; i <= 9; i += 1) {
    soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }
  soma = 0;
  for (let i = 1; i <= 10; i += 1) {
    soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(10, 11), 10)) {
    return false;
  }
  return true;
};

export default validateCPF;
