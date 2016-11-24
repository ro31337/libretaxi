import OptionsResponse from '../options-response';
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
export default class OptimizedOptions extends CompositeResponseDecorator {
  /**
   * Optimize response
   *
   * @override
   */
  optimize(r1, r2, response) {
    if (r2 && r1.type === 'text' && r2.type === 'options' && !r2.message) {
      response.add(new OptionsResponse({ rows: r2.rows, message: r1.message }));
      return true;
    }
    return false;
  }
}
