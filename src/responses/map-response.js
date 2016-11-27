import Response from './response';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Map response. Used to display map to the user.
 * This response has `type` property set to `map`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-11-26
 * @version 1.1
 * @since 0.1.0
 */
export default class MapResponse extends mix(Response).with(checkNotNull('location')) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.location - location, array with two decimal coordinates.
   * For example: `[37.421955, -122.084058]` (location of GooglePlex in MTV)
   * @param {string} options.message - (optional) message to display before showing the map,
   * platform-specific
   */
  constructor(options) {
    super(Object.assign({ type: 'map' }, options));
    this.location = options.location;
    this.message = options.message;
  }
}
