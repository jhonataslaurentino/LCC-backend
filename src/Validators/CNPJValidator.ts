import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validateCNPJ } from '../utils/validateCNPJ';

@ValidatorConstraint({ name: 'CNPJ validator', async: false })
class CNPJValidator implements ValidatorConstraintInterface {
  validate(cnpj: string): boolean {
    const isCNPJValid = validateCNPJ(cnpj);
    return isCNPJValid;
  }

  defaultMessage({ value }: ValidationArguments): string {
    return `CNPJ: ${value} is invalid`;
  }
}

export { CNPJValidator };
