import Response from './response';
import objectAssign from 'object-assign';
import { mix } from 'mixwith';
import ValidatedOptionsResponse from '../validations/validated-options-response';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Inline options response is response that contains rows of options. Each row is
 * array. Each option in the row is object with `label` and `value` properties
 * set.
 *
 * Works the same way as {@link OptionsResponse}, the difference is that inline options response
 * is non-bloking, and buttons appear in message feed along with the other text. You can
 * think about inline options as of clickable text.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {checkNotNull}
 * @extends {ValidatedOptionsResponse}
 * @date 2016-10-09
 * @version 1.1
 * @since 0.1.0
 */
export default class InlineOptionsResponse extends
  mix(Response).with(checkNotNull('rows'), ValidatedOptionsResponse) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.rows - Array of rows of options. Where each row is
   * array of objects. Each object must contain two properties: `label` and `value`.
   * @param {string} options.message - (optional) message to display before rendering the list
   * of options
   * @example
   * const r = new InlineOptionsResponse({
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
    const opts = objectAssign({ type: 'inline-options' }, options);
    super(opts);
    objectAssign(this, opts);
  }
}
