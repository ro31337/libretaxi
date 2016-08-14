import stateful from './stateful';
import { mix } from 'mixwith';
import checkNotNull from './validations/check-not-null';

/**
 * Order.
 * Represents passenger's order. Will keep the following information:
 * - order key (guid)
 * - passenger location
 * - passenger destination
 * - passenger key
 * - price
 * - driver key
 * - createdAt
 * - acceptedAt
 * and so on...
 * ...plus geo position (to be set with geoFire package).
 *
 * Drivers are subscribed to new orders in their area.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Stateful}
 * @extends {checkNotNull}
 * @date 2016-08-13
 * @version 1.1
 * @since 0.1.0
 */
export default class Order extends
  mix(stateful()).with(checkNotNull('orderKey')) {

  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} options.orderKey - Order identifier (guid).
   */
  constructor(options) {
    super(options);
    Object.assign(this, options);

    this.stateful = {
      key: this.orderKey,
      table: 'orders',
    };
  }
}
