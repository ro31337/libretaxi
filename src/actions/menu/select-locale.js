import Action from '../../action';
import OptionsResponse from '../../responses/options-response';
import CompositeResponse from '../../responses/composite-response';
import SelectLocaleResponse from '../../responses/select-locale-response';
import TextResponse from '../../responses/text-response';
import RedirectResponse from '../../responses/redirect-response';
import If from '../../responses/if-response';
import In from '../../conditions/in';
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
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link TextResponse} and {@link OptionsResponse}.
   */
  get() {
    return new CompositeResponse()
      .add(new TextResponse({ message: 'Select your language:' }))
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
            { label: '🇹🇷 Türkçe', value: locales[5] },
          ],
          [
            { label: 'Français', value: locales[6] },
          ],
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
    return new If({
      condition: new In(value, locales),
      ok: new CompositeResponse()
        .add(new SelectLocaleResponse({ locale: value }))
        .add(new TextResponse({ message: '👌 OK!' }))
        .add(new RedirectResponse({ path: 'select-user-type' })),
      err: this.get(),
    });
  }
}
