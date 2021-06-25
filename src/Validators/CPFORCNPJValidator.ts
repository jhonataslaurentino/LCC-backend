import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validateCNPJ } from '../utils/validateCNPJ';
import validateCPF from '../utils/ValidateCPF';

@ValidatorConstraint({ name: 'CPF/CNPJ Validator', async: false })
class CPFORCNPJValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const isDocumentValid = validateCNPJ(value) || validateCPF({ cpf: value });
    return isDocumentValid;
  }

  defaultMessage({ value }: ValidationArguments): string {
    return `CPF/CNPJ ${value} is invalid`;
  }
}

export { CPFORCNPJValidator };
