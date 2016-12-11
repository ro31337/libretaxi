import Condition from './condition';
import dotenv from 'dotenv';

/**
 * Radius Condition.
 * Checks if provided value can be used as radius.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-10
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class Radius extends Condition {
  constructor(value) {
    super({ type: 'radius' });
    this.value = value;
    dotenv.config();
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - returns `true` if numeric, otherwise returns `false`.
   */
  call() {
    return /^\s*\d+\s*$/.test(this.value) &&
      this.value * 1 <= process.env.MAX_RADIUS &&
      this.value * 1 > 0;
  }
}
