import ResponseHandler from './response-handler';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';
import ResponseHandlerFactory from '../factories/response-handler-factory';

/**
 * Conditional response handler.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-18
 * @version 1.1
 * @since 0.1.0
 * @see {@link IfResponse}
 */
export default class IfResponseHandler extends
  mix(ResponseHandler).with(checkNotNull('user')) {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link IfResponse} instance.
   * @param {Object} user - {@link User} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'if-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Calls `ok` if condition is truthy.
   * Calls `err` if condition is falsy and `err` is defined.
   */
  call(onResult) {
    const user = this.user;
    const r = this.response;
    const api = this.api;

    if (r.condition.call()) {
      const response = r.ok;
      const handler = ResponseHandlerFactory.getHandler({ response, user, api });
      handler.call(onResult);
    } else if (r.err) {
      const response = r.err;
      const handler = ResponseHandlerFactory.getHandler({ response, user, api });
      handler.call(onResult);
    } else {
      onResult();
    }
  }
}
