/**
 * Google maps link.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-05
 * @version 1.1
 * @since 0.1.0
 */
export default class GoogleMapsLink {

  /**
   * Constructor.
   *
   * @param {Array} location - latitute longitude location, for example `[37.421955, -122.084058]`
   */
  constructor(location) {
    this.location = location;
  }

  /**
   * String representation of google maps link.
   *
   * @override
   * @return {string} - link to google maps
   */
  toString() {
    return `https://www.google.com/maps?q=${this.location[0]},${this.location[1]}`;
  }
}
