import RequestPhoneResponse from '../request-phone-response';
import CompositeResponseDecorator from './composite-response-decorator';

/**
 * {@link CompositeResponse} decorator. Optimize {@link TextResponse} and
 * {@link OptionsResponse} usage by removing the first one from the list of responses and
 * copying the `message` to the second one.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {CompositeResponseDecorator}
 * @date 2016-11-07
 * @version 1.2
 * @since 0.1.0
 */
export default class OptimizedRequestPhone extends CompositeResponseDecorator {
  /**
   * Constructor.
   *
   * @param {Response} origin - origin response.
   */
  constructor(options) {
    super(Object.assign({ type: 'composite' }, options));
  }

  /**
   * Optimize response
   *
   * @override
   */
  optimize(r1, r2, response) {
    if (r2 && r1.type === 'text' && r2.type === 'request-phone') {
      response.add(new RequestPhoneResponse({ message: r1.message, buttonText: r2.buttonText }));
      return true;
    }
    return false;
  }
}
