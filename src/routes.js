import SelectLocale from './actions/menu/select-locale';
import SelectUserType from './actions/menu/select-user-type';
import RequestPhone from './actions/menu/request-phone';
import PassengerIndex from './actions/menu/passenger/index';
import PassengerRequestLocation from './actions/menu/passenger/request-location';
import PassengerRequestDestination from './actions/menu/passenger/request-destination';
import Foo from './actions/menu/foo';
import OrderSubmitted from './actions/menu/passenger/order-submitted';
import BlankScreen from './actions/menu/blank-screen';
import OrderCancelled from './actions/menu/passenger/order-cancelled';

/**
 * @typedef Routes
 * @desc
 *
 * List of routes
 *
 * Keeps the list of routes in application, where key is the route name,
 * and the value is menu action class .
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-06-07
 * @version 1.1
 * @since 0.1.0
 * @example
 * import routes from './routes';
 *
 * // creates instance of default menu action class
 * const instance = new routes['default'];
 */
const routes = {
  default: SelectLocale,
  'select-locale': SelectLocale,
  'select-user-type': SelectUserType,
  'request-phone': RequestPhone,
  'passenger-index': PassengerIndex,
  'taxi-vehicle-config': Foo,
  foo: Foo,
  settings: Foo,
  'passenger-request-location': PassengerRequestLocation,
  'passenger-request-destination': PassengerRequestDestination,
  'order-submitted': OrderSubmitted,
  'blank-screen': BlankScreen,
  'order-cancelled': OrderCancelled,
};

// Adding more routes? update `action-factory-test.js`

export default routes;
