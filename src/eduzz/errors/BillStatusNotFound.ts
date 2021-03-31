class BillStatusNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BillStatusNotFoundError';
  }
}

export default BillStatusNotFoundError;
