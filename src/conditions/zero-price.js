import Condition from './condition';

/**
 * Zero price condition.
 * Checks if provided price equals zero.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-12
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class ZeroPrice extends Condition {
  constructor(value) {
    super({ type: 'zero-price' });
    this.value = value;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - returns `true` if price is zero, otherwise `false`.
   */
  call() {
    return this.value * 1 === 0;
  }
}
