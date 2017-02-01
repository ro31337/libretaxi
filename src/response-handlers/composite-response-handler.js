import ResponseHandler from './response-handler';
import { mix } from 'mixwith';
import checkNotNull from '../validations/check-not-null.js';
import ResponseHandlerFactory from '../factories/response-handler-factory';
import log from '../log';

/**
 * Composite response handler.
 * Iterate through {@link CompositeResponse} and execute handler for each response.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-16
 * @version 1.1
 * @since 0.1.0
 */
export default class CompositeResponseHandler extends
  mix(ResponseHandler).with(checkNotNull('user')) {

  /**
   * Constructor.
   *
   * @param {object} response - {@link CompositeResponse} instance.
   * @param {object} user - {@link User} instance.
   * @param {object} api - (optional) transport library api.
   */
  constructor(options) {
    super(Object.assign({ type: 'composite-response-handler' }, options));
  }

  /**
   * Iterate through {@link CompositeResponse} and execute handler for each response.
   *
   * @param {function} onResult - result callback, passed to every handler. Executed only when
   * every handler in the chain executed its callback. Note that handlers for some platforms
   * do not execute callbacks. For example, {@link TelegramOptionsResponseHandler}.
   * @param {number} index - (optional) current index
   * @param {number} v - (optional) current value, used for recursively iterating through responses
   */
  call(onResult, index, v) {
    const i = index || 0;

    if (i >= this.response.responses.length) {
      onResult(v);
      return;
    }

    const user = this.user;
    const api = this.api;
    const response = this.response.responses[i];
    log.debug(`response type: ${response.type}`);

    const handler = ResponseHandlerFactory.getHandler({ response, user, api });
    log.debug(`handler type: ${handler.type}`);

    handler.call((retVal) => {
      this.call(onResult, i + 1, retVal || v);
    });
  }
}
