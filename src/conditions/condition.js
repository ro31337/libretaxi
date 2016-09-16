import checkNotNull from '../validations/check-not-null.js';
import { mix } from 'mixwith';

/**
 * Condition.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-09-09
 * @extends checkNotNull
 * @abstract
 * @version 1.1
 * @since 0.1.0
 */
export default class Condition extends mix(class {}).with(checkNotNull('type')) {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.type - Condition type, for example: `if`
   */
  constructor(options) {
    super(options);
    this.type = options.type;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - returns `true` if condition is truthy, or false if falsy.
   */
  call() {
    throw new Error('not implemented');
  }
}
