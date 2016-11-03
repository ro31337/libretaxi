import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';

/**
 * Response handler (abstract class).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-07-11
 * @abstract
 * @extends checkNotNull
 * @version 1.1
 * @since 0.1.0
 */
export default class ResponseHandler extends mix(class {})
  .with(checkNotNull(['response', 'type'])) {
  /**
   * Constructor.
   *
   * @param {Response} options.response - instance of {@link Response}, related
   * to this handler.
   * @param {string} options.type - unique type of response handler. For example:
   * `cli-options-response-handler`. Used in unit testing.
   */
  constructor(options) {
    super(options);
    this.response = options.response;
    this.type = options.type;
    this.user = options.user;
    this.api = options.api;
  }

  /**
   * Entry point for the actual response handling.
   *
   * @param {function} onResult - callback that can be called by `call`
   * method when results are ready.
   */
  call(onResult) { // eslint-disable-line no-unused-vars
    throw new Error('not implemented');
  }
}
