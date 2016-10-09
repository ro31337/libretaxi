import Condition from './condition';

/**
 * Numeric Condition.
 * Checks if provided value is "numer-ish" and one of the following:
 * - number
 * - string number
 * - string number with spaces at the beginning or at the end
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-08
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class Numeric extends Condition {
  constructor(value) {
    super({ type: 'numeric' });
    this.value = value;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - returns `true` if numeric, otherwise returns `false`.
   */
  call() {
    return /^\s*\d+\s*$/.test(this.value);
  }
}
