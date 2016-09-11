import Condition from './condition';

/**
 * Not In Condition.
 * Accepts value and array. Returns true if value is not in array.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-11
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class NotIn extends Condition {
  constructor(value, arr) {
    super({ type: 'not-in' });
    this.value = value;
    this.arr = arr;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - returns `true` if actual equals expected, otherwise
   * returns `false`.
   */
  call() {
    return !this.arr.includes(this.value);
  }
}
