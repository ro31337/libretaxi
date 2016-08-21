import Action from '../../action';
import objectAssign from 'object-assign';
import OptionsResponse from '../../responses/options-response';
import CompositeResponse from '../../responses/composite-response';
import SelectLocaleResponse from '../../responses/select-locale-response';
import TextResponse from '../../responses/text-response';
import RedirectResponse from '../../responses/redirect-response';
/**
 * Select locale menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-26
 * @version 1.3
 * @since 0.1.0
 */
export default class SelectLocale extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(objectAssign({ type: 'select-locale' }, options));
  }

  /**
   * Returns greeting text and list of available languages.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link OptionsResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: 'Select your language:' }))
      .add(new OptionsResponse({
        rows: [
          [{ label: 'English', value: 'en' }, { label: 'Русский', value: 'ru' }],
        ],
      }));
  }

  /**
   * Sets selected locale and redirects.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link SelectLocaleResponse}, and {@link RedirectResponse}.
   */
  post(value) {
    return new CompositeResponse()
      .add(new SelectLocaleResponse({ locale: value }))
      .add(new TextResponse({ message: '👌 OK!' }))
      .add(new RedirectResponse({ path: 'select-user-type' }));
  }
}
