class EduzzApiKeyError extends Error {
  constructor(message = 'Forbidden Api Key') {
    super(message);
    this.name = 'EduzzApiKeyError';
  }
}

export default EduzzApiKeyError;
