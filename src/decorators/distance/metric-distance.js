/**
 * Metric distance.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-05
 * @version 1.1
 * @since 0.1.0
 */
export default class MetricDistance {

  /**
   * Constructor.
   *
   * @param {object} i18n - initialized i18n object
   * @param {number} distance - distance, in kilometers. Can be float. For example `7.738472`.
   */
  constructor(i18n, distance) {
    this.i18n = i18n;
    this.distance = distance;
  }

  /**
   * String representation of metric distance.
   *
   * @override
   * @return {string} - localized string, for example "7.7 km"
   */
  toString() {
    return this.i18n.__('metric-distance.km', this.distance.toFixed(1));
  }
}
