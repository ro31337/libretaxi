import Condition from './condition';

/**
 * Not In Condition.
 * Accepts value and array. Returns true if array doesn't include value.
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
   * @returns {boolean} result - `true` if array doesn't include value, `false` otherwise.
   */
  call() {
    return !this.arr.includes(this.value);
  }
}
