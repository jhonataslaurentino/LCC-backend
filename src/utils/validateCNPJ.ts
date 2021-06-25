/* eslint-disable no-plusplus */
function validateCNPJ(cnpj: string): boolean {
  const cnpjStructured = cnpj.replace(/[^\d]+/g, '');

  if (cnpjStructured === '') return false;

  if (cnpjStructured.length !== 14) return false;

  // Elimina CNPJs invalidos conhecidos
  const invalidCNPJS = [
    '00000000000000',
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999',
  ];
  if (invalidCNPJS.includes(cnpjStructured)) return false;

  // Valida DVs
  let tamanho = cnpjStructured.length - 2;
  let numeros = cnpjStructured.substring(0, tamanho);
  const digitos = cnpjStructured.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i -= 1) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(0))) return false;

  tamanho += 1;
  numeros = cnpjStructured.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i -= 1) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(1))) return false;

  return true;
}

export { validateCNPJ };
