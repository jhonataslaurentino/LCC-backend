const BitwiseAnd = (firstValue: number, secondValue: number): boolean => {
  // eslint-disable-next-line no-bitwise
  const result = (firstValue & secondValue) === secondValue;
  return Boolean(result);
};

export default BitwiseAnd;
