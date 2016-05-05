
/**
 * Argument error.
 * Use this class to throw argument error exceptions, e.g. in your constructor.
 *
 * @extends Error
 * @param {string} message - Exception description.
 * @example
 * throw new ArgumentError('X parameter not specified');
 */
export class ArgumentError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor.name);
  }
}
