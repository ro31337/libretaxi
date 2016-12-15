import Response from './response';
import objectAssign from 'object-assign';
import { mix } from 'mixwith';
import ValidatedOptionsResponse from '../validations/validated-options-response';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Options response is response that contains rows of options. Each row is
 * array. Each option in the row is object with `label` and `value` properties
 * set.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {checkNotNull}
 * @extends {ValidatedOptionsResponse}
 * @date 2016-06-08
 * @version 1.1
 * @since 0.1.0
 */
export default class OptionsResponse extends
  mix(Response).with(checkNotNull('rows'), ValidatedOptionsResponse) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.rows - Array of rows of options. Where each row is
   * array of objects. Each object must contain two properties: `label` and `value`.
   * Please note: because of Telegram platform limitations all labels should be unique, see also
   * {@link OptionsMap}.
   * @param {string} options.message - (optional) message to display before rendering the list
   * of options
   * @param {string} options.defaultMessage - (optional) same as `message`, but safe to replace
   * @see https://github.com/ro31337/libretaxi/issues/301
   * @see https://github.com/ro31337/libretaxi/issues/300
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
    objectAssign(this, opts);
  }
}
