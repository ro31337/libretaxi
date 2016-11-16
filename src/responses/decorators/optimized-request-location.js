import RequestLocationResponse from '../request-location-response';
import CompositeResponseDecorator from './composite-response-decorator';

/**
 * {@link CompositeResponse} decorator. Optimize {@link TextResponse} and
 * {@link RequestLocationResponse} usage by removing the first one from the list of responses and
 * copying the `message` to the second one.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {CompositeResponseDecorator}
 * @date 2016-11-15
 * @version 1.1
 * @since 0.1.0
 */
export default class OptimizedRequestLocation extends CompositeResponseDecorator {
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
    if (r2 && r1.type === 'text' && r2.type === 'request-location') {
      response.add(new RequestLocationResponse({ message: r1.message, buttonText: r2.buttonText }));
      return true;
    }
    return false;
  }
}
