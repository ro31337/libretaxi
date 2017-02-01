import Response from './response';
/**
 * Composite response.
 * Use to combine multiple responses.
 * This response has `type` property set to `composite`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-07-09
 * @version 1.1
 * @since 0.1.0
 * @example
 * return new CompositeResponse()
 *   .add(new TextResponse(`Text goes here`))
 *   .add(new SelectLocaleResponse('en'))
 *   .add(new RedirectResponse(...));
 */
export default class CompositeResponse extends Response {
  /**
   * Constructor.
   */
  constructor() {
    const options = { type: 'composite', rr: [] };
    super(options);
    Object.assign(this, options);
  }

  /**
   * Add response to composite.
   *
   * @param {Response} response - Response instance that you want to add to composite.
   * @returns {CompositeResponse} response - returns `this`, so you can chain methods.
   */
  add(response) {
    this.rr.push(response);
    return this;
  }

  /**
   * List of responses.
   */
  get responses() {
    return this.rr;
  }
}
