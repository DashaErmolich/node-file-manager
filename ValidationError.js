export class ValidationError extends Error {
  constructor(message) {
    super('ValidationError: ' + message);
    this.name = 'ValidationError';
  }
}
