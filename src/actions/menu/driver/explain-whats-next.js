import Action from '../../../action';
import OptionsResponse from '../../../responses/options-response';
import CompositeResponse from '../../../responses/composite-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';

/**
 * Explain what's next for driver (menu action).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-04
 * @version 1.1
 * @since 0.1.0
 */
export default class ExplainWhatsNext extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'driver-explain-whats-next' }, options));
  }

  /**
   * Returns "what's next" explanation, and "Next" button.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link OptionsResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('text') }))
      .add(new OptionsResponse({
        rows: [
          [
            { label: this.t('next'), value: 'next' },
          ],
        ],
      }));
  }

  /**
   * Shows "OK" and redirects to `index`
   *
   * @return {CompositeResponse} - composite response with OK text and redirect
   */
  post() {
    return new CompositeResponse()
      .add(new TextResponse({ message: '👌 OK!' }))
      .add(new RedirectResponse({ path: 'driver-index' }));
  }
}
