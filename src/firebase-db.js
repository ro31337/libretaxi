import firebase from 'firebase';
import Settings from '../settings';

let firebaseDB;
let overrides;

/**
 * @typedef firebaseDB
 * @desc
 *
 * Firebase connection.
 *
 * Keeps `config` function that can be used when it's required to initialize
 * database connection. If connection is already present, returns the handle
 * of existing connection.
 *
 * IMPORTANT! Do not call `config()` in your constructor(s). Keep your constructors
 * code-free. With this approach it will be easier to test and develop.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-11
 * @version 1.2
 * @since 0.1.0
 * @example
 * import firebaseDB from 'firebase-db';
 *
 * // ...
 *
 * this.db = firebaseDB.config();
 */
const config = () => {
  if (firebaseDB) return firebaseDB;

  const settings = new Settings(overrides);

  // configuration hash
  const cfg = {
    serviceAccount: settings.STATEFUL_CREDENTIALS_FILE, // must be undefined for tests
    databaseURL: settings.STATEFUL_CONNSTR,
  };

  // actual configuration
  firebaseDB = firebase.initializeApp(cfg).database();
  return firebaseDB;
};

/**
 * @typedef firebaseDB
 * @desc
 *
 * Override settings for tests.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-12-20
 * @version 1.1
 * @since 0.1.0
 */
const overrideSettings = (settings) => {
  overrides = settings;
};

export default { config };
export { overrideSettings };
