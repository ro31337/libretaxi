/* eslint-disable no-unused-vars */
import Response from './response';
import objectAssign from 'object-assign';
import { ArgumentError } from '../validations/errors';

/**
 * Options response is response that contains rows of options. Each row is
 * array. Each option in the row is object with `label` and `value` properties
 * set.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-06-08
 * @version 1.1
 * @since 0.1.0
 */
export default class OptionsResponse extends Response {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.rows - Array of rows of options.
   * @throws {ArgumentError} throw error when `rows` parameter not specified
   * @throws {TypeError} throw error `rows` parameter is not array
   * @throws {TypeError} throw error when individual row is not array
   * @throws {TypeError} throw error when individual row item is not object
   * @example
   * const r = new OptionsResponse({
   * 	rows: [
   * 		[{ label: 'One', value: '1' },{ label: 'Two', value: '2' },{ label: 'Three', value: '3' }],
   * 		[{ label: 'OK', value: 'ok' },{ label: 'Cancel', value: 'cancel' }]
   * 	]
   * });
   * // response above represents the following structure:
   * // row 1:   One  |   Two   | Three
   * // row 2:        OK   |   Cancel
   */
  constructor(options) {
    const opts = objectAssign({ type: 'options' }, options);
    super(opts);

    if (!opts.rows) {
      throw new ArgumentError('rows parameter not specified');
    }

    if (!(opts.rows instanceof Array)) {
      throw new TypeError('rows parameter is expected to be an array');
    }

    for (let i = 0; i < opts.rows.length; i++) {
      const row = opts.rows[i];
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

    objectAssign(this, opts);
  }
}
