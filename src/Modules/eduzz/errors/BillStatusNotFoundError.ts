class BillStatusNotFoundError extends Error {
  constructor(message = 'Bill status not found') {
    super(message);
    this.name = 'BillStatusNotFoundError';
  }
}

export default BillStatusNotFoundError;
