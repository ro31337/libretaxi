import Response from './response';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Update location response. Used to update user location.
 * This response has `type` property set to `update-location`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-08-05
 * @version 1.2
 * @since 0.1.0
 */
export default class UpdateLocationResponse extends
  mix(Response).with(checkNotNull('location')) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.location - user's location, array with two decimal coordinates.
   * For example: `[37.421955, -122.084058]` (location of GooglePlex in MTV)
   * @throws {ArgumentError} throw error when message parameter(s) not specified.
   * @example
   * r = new UpdateLocationResponse({ location: [37.421955, -122.084058] });
   * console.log(r.location); // prints "[37.421955, -122.084058]"
   */
  constructor(options) {
    super(Object.assign({ type: 'update-location' }, options));
    this.location = options.location;
  }
}
