import Condition from './condition';

/**
 * Location condition.
 * Accepts object. Returns true when object is array of two elements and elements are numbers.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-23
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class Location extends Condition {

  /**
   * Constructor.
   *
   * @param {Object} value - value to check
   */
  constructor(value) {
    super({ type: 'location' });
    this.value = value;
  }

  /**
   * Entry point for condition.
   * Checks if value is array of 2 numbers (latitude and longitude) and these numbers satisfy
   * the following requirements:
   *
   * - latitude: range from -90.0 to 90.0
   * - longitude: range from -180.0 to 180.0
   *
   * @returns {boolean} result - `true` if value is valid location, `false` otherwise.
   */
  call() {
    return Array.isArray(this.value) &&
      this.value.length === 2 &&
      this.value[0] >= -90 && this.value[0] <= 90 &&
      this.value[1] >= -180 && this.value[1] <= 180;
  }
}
