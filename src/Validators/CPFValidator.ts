import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import validateCPF from '../utils/ValidateCPF';

@ValidatorConstraint({ name: 'CPF Validator', async: false })
class CPFValidator implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    return validateCPF({ cpf });
  }

  defaultMessage({ value }: ValidationArguments): string {
    return `cpf ${value} is invalid`;
  }
}

export default CPFValidator;
