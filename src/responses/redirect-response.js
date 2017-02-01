import Response from './response';
import { ArgumentError } from '../validations/errors';
import routes from './../routes';

/**
 * Redirect response.
 * Response is used to redirect the user to new menu location. Is a subtype
 * of {@link Response} with type 'redirect' (see {@link SupportedResponseTypes}).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-05-10
 * @version 1.1
 * @since 0.1.0
 */
export default class RedirectResponse extends Response {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.path - pre-defined key from {@link Routes}.
   * @throws {ArgumentError} thrown when path invalid or not specified.
   * @example
   * return new RedirectResponse({ path: 'select-locale' });
   */
  constructor(options) {
    const opts = Object.assign({ type: 'redirect' }, options);
    super(opts);

    if (!opts.path) {
      throw new ArgumentError('path parameter not specified');
    }

    if (!routes[opts.path]) {
      throw new ArgumentError('path not found');
    }

    Object.assign(this, opts);
  }
}
