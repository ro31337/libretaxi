import UserStateResponse from './user-state-response';
import objectAssign from 'object-assign';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null';
import checkLocale from '../validations/check-locale';
/**
 * Select locale response. Used to return response that contains
 * locale (`en`, `ru`, etc..) that should be stored in user state.
 * This response inherits `type` property of `user-state` from
 * {@link UserStateResponse}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {UserStateResponse}
 * @date 2016-06-17
 * @version 1.2
 * @since 0.1.0
 */
export default class SelectLocaleResponse extends
  mix(UserStateResponse).with(checkNotNull('locale'), checkLocale) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} locale - Two-letter lower-cased locale (`en`, `ru`, etc.)
   * @throws {ArgumentError} throw error when locale not specified
   * @example
   * r = new SelectLocaleResponse({ locale: 'en' });
   * console.log(r.locale); // prints "en"
   * console.log(r.type); // prints "user-state"
   */
  constructor(options) {
    super(options);
    objectAssign(this, options);
  }
}
