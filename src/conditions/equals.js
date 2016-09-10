import Condition from './condition';

/**
 * Equals Condition.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-09
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class Equals extends Condition {
  constructor(actual, expected) {
    super();
    this.actual = actual;
    this.expected = expected;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - returns `true` if actual equals expected, otherwise
   * returns `false`.
   */
  call() {
    return this.actual === this.expected;
  }
}
