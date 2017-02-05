import Action from '../../action';
import OptionsResponse from '../../responses/options-response';
import CompositeResponse from '../../responses/composite-response';
import SelectLocaleResponse from '../../responses/select-locale-response';
import TextResponse from '../../responses/text-response';
import RedirectResponse from '../../responses/redirect-response';
import UserStateResponse from '../../responses/user-state-response';
import If from '../../responses/if-response';
import In from '../../conditions/in';
import Equals from '../../conditions/equals';
import locales from '../../validations/supported-locales';

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
    super(Object.assign({ type: 'select-locale' }, options));
  }

  /**
   * Returns greeting text and list of available languages.
   *
   * @return {IfResponse} Returns instance of conditional response
   */
  get() {
    return new If({
      condition: new Equals(this.user.state.selectLocalePage, 2),
      ok: this.page2(),
      err: this.page1(),
    });
  }

  /**
   * Sets selected locale and redirects.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link SelectLocaleResponse}, and {@link RedirectResponse}.
   */
  post(value) {
    return new If({
      condition: new In(value, locales.concat(['page1', 'page2'])),
      ok: new CompositeResponse()
        .add(new If({ condition: new Equals(value, 'page1'), ok: this.toPage(1) }))
        .add(new If({ condition: new Equals(value, 'page2'), ok: this.toPage(2) }))
        .add(new If({ condition: new In(value, locales), ok: this.confirm(value) })),
    });
  }

  /**
   * Confirm selected language
   *
   * @private
   */
  confirm(value) {
    return new CompositeResponse()
      .add(new SelectLocaleResponse({ locale: value }))
      .add(new TextResponse({ message: '👌 OK!' }))
      .add(new RedirectResponse({ path: 'select-user-type' }));
  }

  /**
   * Update user state to specific page
   *
   * @param {number} page - page number
   * @private
   */
  toPage(page) {
    return new UserStateResponse({ selectLocalePage: page });
  }

  /**
   * Page 1
   *
   * @private
   */
  page1() {
    return new CompositeResponse()
      .add(new TextResponse({ message: 'Select your language (page 1/2):' }))
      .add(new OptionsResponse({
        rows: [
          [
            { label: 'English', value: locales[0] },
            { label: 'Español', value: locales[1] },
          ],
          [
            { label: '🇮🇩 Bahasa Indonesia', value: locales[2] },
            { label: '🇧🇷 Português', value: locales[3] },
          ],
          [
            { label: '🇷🇺 Русский', value: locales[4] },
            { label: '... →', value: 'page2' },
          ],
        ],
      }));
  }

  /**
   * Page 2
   *
   * @private
   */
  page2() {
    return new CompositeResponse()
      .add(new TextResponse({ message: 'Select your language (page 2/2):' }))
      .add(new OptionsResponse({
        rows: [
          [
            { label: '← ...', value: 'page1' },
            { label: '🇹🇷 Türkçe', value: locales[5] },
          ],
        ],
      }));
  }
}
