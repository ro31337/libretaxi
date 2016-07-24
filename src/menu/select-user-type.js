import Action from '../action';
import objectAssign from 'object-assign';
import OptionsResponse from '../responses/options-response';
import CompositeResponse from '../responses/composite-response';
import UserStateResponse from '../responses/user-state-response';
import TextResponse from '../responses/text-response';
import RedirectResponse from '../responses/redirect-response';

/**
 * Select user type menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-07-24
 * @version 1.1
 * @since 0.1.0
 */
export default class SelectUserType extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(objectAssign({ type: 'select-user-type' }, options));
  }

  /**
   * Returns text and list of available user types.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link OptionsResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: this.t('who_you_are') }))
      .add(new OptionsResponse({
        rows: [
          [
            { label: this.t('taxi'), value: 'taxi' },
            { label: this.t('passenger'), value: 'passenger' },
          ],
        ],
      }));
  }

  /**
   * Sets selected user type and redirects.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link UserStateResponse}, and {@link RedirectResponse}.
   */
  post(value) {
    return new CompositeResponse()
      .add(new UserStateResponse({ userType: value }))
      .add(new RedirectResponse({ path: 'default' }));
  }
}
