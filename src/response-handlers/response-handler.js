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
   * @param {sting} options.type - unique type of response handler. For example:
   * `cli-options-response-handler`. Used in unit testing.
   */
  constructor(options) {
    super(options);
    this.response = options.response;
    this.type = options.type;
  }

  /**
   * Entry point for the actual response handling.
   *
   * @param {function} onResult - (optional) callback that can be called by `call`
   * method when results are ready. Telegram results usually ready on user
   * interaction, so there is no need for this callback. But for cli platform it
   * can be useful to call this callback (but it's not required).
   */
  call(onResult) { // eslint-disable-line no-unused-vars
    throw new Error('not implemented');
  }
}
