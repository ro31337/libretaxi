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
  foo: Foo,
  settings: Foo,
  'passenger-request-location': PassengerRequestLocation,
  'passenger-request-destination': PassengerRequestDestination,
  'order-submitted': OrderSubmitted,
  'blank-screen': BlankScreen,
  'order-cancelled': OrderCancelled,
  redirect: Redirect,
  'driver-select-vehicle-type': SelectVehicleType,
  'driver-explain-checkins': ExplainCheckins,
  'driver-request-location': DriverRequestLocation,
  'driver-explain-whats-next': ExplainWhatsNext,
  'driver-index': DriverIndex,
  'driver-checkin': DriverCheckin,
  'driver-mute': DriverMute,
  'driver-unmute': DriverUnmute,
  'driver-order-new': DriverOrderNew,
  'passenger-request-price': PassengerRequestPrice,
  'passenger-contact-new-number': PassengerContactNewNumber,
  'save-and-redirect': SaveAndRedirect,
  'driver-order-set-price': DriverOrderSetPrice,
  'passenger-contact-driver-price': PassengerContactDriverPrice,
  'passenger-verify-location': PassengerVerifyLocation,
  'passenger-verify-cash': PassengerVerifyCash,
  'driver-request-radius': RequestRadius,
  'show-message': ShowMessage,
  'update-identity': UpdateIdentity,
  'confirm-locale': ConfirmLocale,
};

// Adding more routes? update `action-factory-test.js`

export default routes;
