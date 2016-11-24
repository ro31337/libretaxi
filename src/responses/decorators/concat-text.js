import TextResponse from '../text-response';
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
export default class ConcatText extends CompositeResponseDecorator {
  /**
   * Optimize response
   *
   * @override
   */
  optimize(r1, r2, response) {
    if (r2 && r1.type === 'text' && r2.type === 'text') {
      const m1 = r1.message;
      const m2 = r2.message;
      const separator = m1.length > 20 ? '\n' : ' ';
      response.add(new TextResponse({ message: m1 + separator + m2 }));
      return true;
    }
    return false;
  }
}
