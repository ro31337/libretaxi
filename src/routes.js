import SelectLocale from './menu/select-locale';
import SelectUserType from './menu/select-user-type';
import RequestPhone from './menu/request-phone';
import PassengerIndex from './menu/passenger/index';
import PassengerRequestLocation from './menu/passenger/request-location';
import Foo from './menu/foo';

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
  'looking-for-taxi': Foo,
};

export default routes;
