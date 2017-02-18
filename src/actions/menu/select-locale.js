import Action from '../../action';
import OptionsResponse from '../../responses/options-response';
import CompositeResponse from '../../responses/composite-response';
import SelectLocaleResponse from '../../responses/select-locale-response';
import TextResponse from '../../responses/text-response';
import RedirectResponse from '../../responses/redirect-response';
import UserStateResponse from '../../responses/user-state-response';
import If from '../../responses/if-response';
import In from '../../conditions/in';
import locales, { localeMap } from '../../validations/supported-locales';
import PagedOptions from '../../responses/decorators/paged-options';

/**
 * Select locale menu action.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-26
 * @version 1.4
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
   * @return {CompositeResponse} - instance of composite response
   */
  get() {
    const r = this.pagedOptions();
    return new CompositeResponse()
      .add(new TextResponse({
        message: `Select your language (page ${r.currentPage}/${r.totalPages}):`,
      }))
      .add(r);
  }

  /**
   * Conditionally sets selected locale and redirects.
   *
   * @return {CompositeResponse} Returns instance of {@link CompositeResponse}
   * which contains {@link SelectLocaleResponse}, and {@link RedirectResponse}.
   */
  post(value) {
    return new If({
      condition: new In(value, ['next', 'previous']),
      ok: this.switchPage(value),
      err: new If({ condition: new In(value, locales), ok: this.confirm(value) }),
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
      .add(new RedirectResponse({ path: 'confirm-locale' }));
  }

  /**
   * Switch page (next/previous).
   *
   * @param {string} value - `next` or `previous`.
   * @private
   */
  switchPage(value) {
    const r = this.pagedOptions();
    const n = r.nextPageNumber(value);
    return new UserStateResponse({ selectLocalePage: n });
  }

  /**
   * Paged options response
   *
   * @private
   */
  pagedOptions() {
    return new PagedOptions(
      this.user.state.selectLocalePage,
      new OptionsResponse({
        rows: [
          locales.map(locale => ({
            label: localeMap.get(locale),
            value: locale }),
          ),
        ],
      })
    );
  }
}
