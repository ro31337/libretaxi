import ResponseHandler from './response-handler';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';
import ResponseHandlerFactory from '../factories/response-handler-factory';

/**
 * Promise response handler.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2017-05-06
 * @version 1.1
 * @since 0.1.0
 * @see {@link PromiseResponse}
 */
export default class PromiseResponseHandler extends
  mix(ResponseHandler).with(checkNotNull('user')) {

  /**
   * Constructor.
   *
   * @type {Object}
   * @param {Object} response - {@link PromiseResponse} instance.
   * @param {Object} user - {@link User} instance.
   * @param {object} api - (optional) transport library api.
   */
  constructor(options) {
    super(Object.assign({ type: 'promise-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Calls `cb` if promise resolved.
   */
  call(onResult) {
    const { api, user } = this;
    this
      .response
      .promise
      .then((result) => {
        const handler = ResponseHandlerFactory.getHandler({
          response: this.response.cb(result),
          user,
          api,
        });
        handler.call(onResult);
      });
  }
}
