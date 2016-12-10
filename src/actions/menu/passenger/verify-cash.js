import Action from '../../../action';
import CompositeResponse from '../../../responses/composite-response';
import TextResponse from '../../../responses/text-response';
import RedirectResponse from '../../../responses/redirect-response';
import OptionsResponse from '../../../responses/options-response';
import If from '../../../responses/if-response';
import NotIn from '../../../conditions/not-in';
import Equals from '../../../conditions/equals';

/**
 * Ask passenger to check if s/he has cash. If passenger answer is `no`, redirect back
 * with instructions to go and get some cash.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-09
 * @version 1.1
 * @since 0.1.0
 */
export default class PassengerVerifyCash extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'passenger-verify-cash' }, options));
  }

  /**
   * Response with text and yes/no options.
   *
   * @return {CompositeResponse} response
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('verify_cash') }))
      .add(new OptionsResponse({
        rows: [
          [{ label: this.gt('yes'), value: 'yes' }],
          [{ label: this.gt('no'), value: 'no' }],
        ],
        defaultMessage: this.gt('default_options_message'),
      }));
  }

  /**
   * Check the answer and redirect back or forward. Render `get` action if answer is unknown.
   *
   * @param {String} value - yes/no value is expected
   * @return {CompositeResponse} response - return redirect response or re-render get action.
   */
  post(value) {
    return new CompositeResponse()
      .add(new If({
        condition: new Equals(value, 'yes'),
        ok: new CompositeResponse()
          .add(new TextResponse({ message: '👌 OK!' }))
          .add(new RedirectResponse({ path: 'passenger-request-location' })),
      }))
      .add(new If({
        condition: new Equals(value, 'no'),
        ok: new CompositeResponse()
          .add(new TextResponse({ message: this.t('get_some_cash') }))
          .add(new RedirectResponse({ path: 'passenger-index' })),
      }))
      .add(new If({ condition: new NotIn(value, ['yes', 'no']), ok: this.get() }));
  }
}
