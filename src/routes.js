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
import Redirect from './actions/menu/redirect';
import SelectVehicleType from './actions/menu/driver/select-vehicle-type';
import ExplainCheckins from './actions/menu/driver/explain-checkins';
import DriverRequestLocation from './actions/menu/driver/request-location';
import ExplainWhatsNext from './actions/menu/driver/explain-whats-next';
import DriverIndex from './actions/menu/driver/index';
import DriverCheckin from './actions/menu/driver/checkin';
import DriverMute from './actions/menu/driver/mute';
import DriverUnmute from './actions/menu/driver/unmute';
import DriverOrderNew from './actions/menu/driver/order/new';
import PassengerRequestPrice from './actions/menu/passenger/request-price';
import PassengerContactNewNumber from './actions/menu/passenger/contact/new-number';
import SaveAndRedirect from './actions/menu/save-and-redirect';
import DriverOrderSetPrice from './actions/menu/driver/order/set-price';
import PassengerContactDriverPrice from './actions/menu/passenger/contact/driver-price';
import PassengerVerifyLocation from './actions/menu/passenger/verify-location';
import PassengerVerifyCash from './actions/menu/passenger/verify-cash';
import RequestRadius from './actions/menu/driver/request-radius';
import ShowMessage from './actions/menu/show-message';
import UpdateIdentity from './actions/menu/update-identity';
import ConfirmLocale from './actions/menu/confirm-locale';
import ParsedLocation from './actions/decorators/parsed-location';
import LookupAddress from './actions/decorators/lookup-address';

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
 * @version 1.2
 * @since 0.1.0
 * @example
 * import routes from './routes';
 *
 * // creates instance of default menu action class
 * const instance = new routes['default'];
 */
const routes = {
  default: (...args) => new SelectLocale(...args),
  'select-locale': (...args) => new SelectLocale(...args),
  'select-user-type': (...args) => new SelectUserType(...args),
  'request-phone': (...args) => new RequestPhone(...args),
  'passenger-index': (...args) => new PassengerIndex(...args),
  foo: (...args) => new Foo(...args),
  settings: (...args) => new Foo(...args),
  'passenger-request-location': (options) => new ParsedLocation(
    options,
    new LookupAddress(options, new PassengerRequestLocation(options))
  ),
  'passenger-request-destination': (...args) => new PassengerRequestDestination(...args),
  'order-submitted': (...args) => new OrderSubmitted(...args),
  'blank-screen': (...args) => new BlankScreen(...args),
  'order-cancelled': (...args) => new OrderCancelled(...args),
  redirect: (...args) => new Redirect(...args),
  'driver-select-vehicle-type': (...args) => new SelectVehicleType(...args),
  'driver-explain-checkins': (...args) => new ExplainCheckins(...args),
  'driver-request-location': (options) => new ParsedLocation(
    options,
    new DriverRequestLocation(options)
  ),
  'driver-explain-whats-next': (...args) => new ExplainWhatsNext(...args),
  'driver-index': (...args) => new DriverIndex(...args),
  'driver-checkin': (options) => new ParsedLocation(
    options,
    new LookupAddress(options, new DriverCheckin(options))
  ),
  'driver-mute': (...args) => new DriverMute(...args),
  'driver-unmute': (...args) => new DriverUnmute(...args),
  'driver-order-new': (...args) => new DriverOrderNew(...args),
  'passenger-request-price': (...args) => new PassengerRequestPrice(...args),
  'passenger-contact-new-number': (...args) => new PassengerContactNewNumber(...args),
  'save-and-redirect': (...args) => new SaveAndRedirect(...args),
  'driver-order-set-price': (...args) => new DriverOrderSetPrice(...args),
  'passenger-contact-driver-price': (...args) => new PassengerContactDriverPrice(...args),
  'passenger-verify-location': (...args) => new PassengerVerifyLocation(...args),
  'passenger-verify-cash': (...args) => new PassengerVerifyCash(...args),
  'driver-request-radius': (...args) => new RequestRadius(...args),
  'show-message': (...args) => new ShowMessage(...args),
  'update-identity': (...args) => new UpdateIdentity(...args),
  'confirm-locale': (...args) => new ConfirmLocale(...args),
};

// Adding more routes? update `action-factory-test.js`

export default routes;
