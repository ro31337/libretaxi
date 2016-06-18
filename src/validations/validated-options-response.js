import { ArgumentError } from './errors';
import { Mixin } from 'mixwith';

/**
 * @typedef ValidatedOptionsResponse
 *
 * Validator for {@link Response}.
 * It validates constructor parameters only and has no other behavior.
 *
 * @abstract
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-04
 * @version 1.3
 * @since 0.1.0
 */
export default Mixin((s) => class extends s { // eslint-disable-line
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.type - Response type, for example: `test`
   * See {@link SupportedResponseTypes}
   * @throws {ArgumentError} throw error when `options.type` is not supported.
   * See {@link SupportedResponseTypes}.
   */
  constructor(options) {
    super(options);

    if (!(options.rows instanceof Array)) {
      throw new TypeError('rows parameter is expected to be an array');
    }

    for (let i = 0; i < options.rows.length; i++) {
      const row = options.rows[i];
      if (!(row instanceof Array)) {
        throw new TypeError('row is expected to be an array');
      }
      for (let j = 0; j < row.length; j++) {
        const item = row[j];
        if (!(item instanceof Object)) {
          throw new TypeError('row item is expected to be an object');
        }
        if (!item.label) {
          throw new ArgumentError('row item is expected to have \'label\' property');
        }
        if (!item.value) {
          throw new ArgumentError('row item is expected to have \'value\' property');
        }
      }
    }
  }
});
