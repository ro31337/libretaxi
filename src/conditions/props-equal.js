import Condition from './condition';

/**
 * Props Equal condition. Compare props from fragment hash to master hash. Doesn't perform deep
 * comparison.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-17
 * @extends {Condition}
 * @version 1.1
 * @since 0.1.0
 */
export default class PropsEqual extends Condition {

  /**
   * Constructor.
   *
   * @param {Object} fragment - expected fragment to compare to master (hash of props)
   * @param {Object} master - actual master hash of props
   * @returns {boolean} result - returns `true` if actual equals expected, otherwise
   * returns `false`.
   */
  constructor(fragment, master) {
    super({ type: 'props-equal' });
    this.fragment = fragment;
    this.master = master;
  }

  /**
   * Entry point for condition.
   *
   * @returns {boolean} result - returns `true` if all props from the `fragment` are equal to
   * the same props in `master` (master can contain more props). Otherwise `false`.
   */
  call() {
    for (const k of Object.keys(this.fragment)) {
      if (this.fragment[k] !== this.master[k]) {
        return false;
      }
    }
    return true;
  }
}
