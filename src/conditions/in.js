import Condition from './condition';

/**
 * In Condition.
 * Accepts value and array. Returns true when array includes value.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-11-11
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class In extends Condition {
  constructor(value, arr) {
    super({ type: 'in' });
    this.value = value;
    this.arr = arr;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - `true` if array includes value, `false` otherwise.
   */
  call() {
    return this.arr.includes(this.value);
  }
}
