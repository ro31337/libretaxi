/**
 * User identity.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-29
 * @version 1.1
 * @since 0.1.0
 */
export default class Identity {

  /**
   * Constructor.
   *
   * @param {string} origin - origin string (for example: `Driver`), also used as fallback string
   * if no identity params provided
   * @param {object} identity - identity hash
   * @param {string} identity.first - first name
   * @param {string} identity.last - last name
   * @param {string} identity.username - platform username
   */
  constructor(origin, identity) {
    this.origin = origin;
    this.identity = identity;
  }

  /**
   * Decorate origin with identity props.
   *
   * @override
   * @return {string} - decorated string
   */
  toString() {
    const arr = [];
    const id = this.identity || {};
    if (id.first) {
      arr.push(id.first);
    }
    if (id.last) {
      arr.push(id.last);
    }
    if (id.username) {
      arr.push(`@${id.username}`);
    }
    if (arr.length > 0) {
      return `${this.origin} (${arr.join(' ')})`;
    }
    return this.origin;
  }
}
