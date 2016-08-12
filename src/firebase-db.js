import firebase from 'firebase';
import dotenv from 'dotenv';

let firebaseDB;

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
 * Uses `dotenv` package under the hood to read configuration from your `.env`
 * file:
 *
 * - `STATEFUL_CREDENTIALS_FILE` for credentials file path
 * - `STATEFUL_CONNSTR` for firebase database url (without trailing references).
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

  // configure dotenv
  dotenv.config();

  // configuration hash
  const cfg = {
    serviceAccount: process.env.STATEFUL_CREDENTIALS_FILE, // must be undefined for tests
    databaseURL: process.env.STATEFUL_CONNSTR,
  };

  // actual configuration
  firebaseDB = firebase.initializeApp(cfg).database();
  return firebaseDB;
};

export default { config };
