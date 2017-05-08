import appRoot from 'app-root-path';

/**
 * Settings
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-19
 * @version 1.1
 * @since 0.1.0
 */
export default class Settings {

  /**
   * Constructor.
   *
   * @param {Object} overrides - settings overrides. Useful for testing.
   */
  constructor(overrides) {
    // Firebase connection string
    this.STATEFUL_CONNSTR = 'https://libretaxi-development.firebaseio.com/';

    // path to Firebase credentials file
    this.STATEFUL_CREDENTIALS_FILE = './libretaxi-development-credentials.json';

    // Telegram token
    this.TELEGRAM_TOKEN = '';

    // default language
    this.DEFAULT_LANGUAGE = 'en';

    // log file
    this.LOG_FILE = `${appRoot.path}/libretaxi.log`;

    // maximum allowed radius for drivers
    this.MAX_RADIUS = 10;

    // geocoding api key, see
    // https://developers.google.com/maps/documentation/geocoding/intro
    this.GEOCODING_API_KEY = '';

    Object.assign(this, overrides);
  }
}
