export class ValidationError extends Error {
  constructor(message) {
    super('Invalid input: ' + message);
    this.name = 'ValidationError';
  }
}
