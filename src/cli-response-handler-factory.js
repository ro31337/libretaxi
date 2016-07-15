import TextResponseHandler from './response-handlers/cli/text-response-handler';
import OptionsResponseHandler from './response-handlers/cli/options-response-handler';

const map = {
  text: TextResponseHandler,
  options: OptionsResponseHandler,
};

/**
 * Response handler factory, implements factory method(s) to create
 * CLI response handlers based on provided response.
 *
 * Creates:
 * TextResponseHandler for `text` response type.
 * OptionsResponseHandler for `options` response type.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-07-15
 * @version 1.1
 * @since 0.1.0
 */
export default class CliResponseHandlerFactory {
  /**
   * Creates concrete `ResponseHandler` instance based on response.
   *
   * @author Roman Pushkin (roman.pushkin@gmail.com)
   * @date 2016-07-15
   * @param {Response} response - response instance. New response handler is
   * created based on `response.type`.
   */
  static fromResponse(response) {
    const klass = map[response.type];
    return new klass({ response }); // eslint-disable-line new-cap
  }
}
