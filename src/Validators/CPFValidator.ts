import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import validateCPF from '../utils/ValidateCPF';

@ValidatorConstraint({ name: 'CPF Validator', async: false })
class CPFValidator implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    const isCPFValid = validateCPF({ cpf });
    return isCPFValid;
  }

  defaultMessage({ value }: ValidationArguments): string {
    return `cpf ${value} is invalid`;
  }
}

export default CPFValidator;
