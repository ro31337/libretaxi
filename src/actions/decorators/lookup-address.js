import Action from '../../action';
import PromiseResponse from '../../responses/promise-response';
// import MapResponse from '../../responses/map-response';

/**
 * Lookup address action decorator.
 * Lookup address and call origin with array of latitude and longitude, for example:
 * [37.421955, -122.084058]
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2017-05-06
 * @abstract
 * @extends Action
 * @version 1.1
 * @since 0.1.0
 */
export default class LookupAddress extends Action {
  /**
   * Constructor.
   *
   * @param {Object} options - action options.
   * @param {Action} origin - origin action.
   */
  constructor(options, origin) {
    super(Object.assign({ type: origin.type }, options));
    this.origin = origin;
  }

  /**
   * This method is not decorated.
   */
  get() {
    return this.origin.get();
  }

  /**
   * Lookup address and call origin with array of coordinates. For example:
   * [37.421955, -122.084058]
   */
  post(address) {
    if (typeof address === 'string') {
      const self = this;
      return new PromiseResponse({
        promise: new Promise((resolve) => {
          if (address === 'google') {
            resolve([37.421955, -122.084058]);
          } else {
            resolve(address);
          }
        }),
        cb: this.origin.post.bind(self),
      });

      // return new CompositeResponse()
      //   .add(new MapResponse({ location: result }))
      //   .add(this.origin.post(result));
    }
    return this.origin.post(address);
  }

  /**
   * This method is not decorated, but re-implemented here. Unfortunately, there is no method
   * overloading in ES6, so this is definitely area of improvement. TODO: later we can remove
   * unnecessary get method for action and use `call` always.
   */
  call(arg) {
    if (arg) {
      return this.post(arg);
    }
    return this.origin.get();
  }

  /**
   * This method is not decorated.
   */
  t(...args) {
    return this.origin.t(...args);
  }

  /**
   * This method is not decorated.
   */
  gt(...args) {
    return this.origin.gt(...args);
  }
}
