require('dotenv').config();
import ValidatedStateStorage from './validations/validated-state-storage';
import objectAssign from 'object-assign';
import Firebase from 'firebase';

/**
 * State storage.
 * Keeps state data, updates state when underlying storage updates.
 * Current implementation is using database. `FIREBASE_STATES_CONNSTR` should
 * be present in `.env`.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ValidatedStateStorage}
 * @date 2016-05-17
 * @version 1.1
 * @since 0.1.0
 * @example
 * new StateStorage(stateKey.toString())
 *   .load()
 *   .then((storage) => {
 *     const state = storage.state;
 *     state.prop1 = 'something';
 *     storage.save();
 *   });
 */
export default class StateStorage extends ValidatedStateStorage {
  /**
   * Constructor.
   *
   * @type {Object}
   * @param {string} key - String representation of storage key, see {@link StateKey}
   */
  constructor(key) {
    super(key);
    this.key = key;
    this.state = {};
    // remove trailing slash if any
    const str = process.env.FIREBASE_STATES_CONNSTR.replace(/\/$/, '');
    this.firebaseUrl = `${str}/${key}`;
  }

  /**
   * Loads data from the storage and inits database connection.
   * This method must be executed before using `save` or `dispose`.
   *
   * @author Roman Pushkin (roman.pushkin@gmail.com)
   * @date 2016-05-17
   * @version 1.1
   * @since 0.1.0
   * @return {Promise} promise that resolves when data has been loaded.
   */
  load() {
    return new Promise((resolve) => {
      this.db = new Firebase(this.firebaseUrl);
      this.db.on('value', (snapshot) => {
        const value = snapshot.val();

        if (value) {
          objectAssign(this.state, value);
        }

        resolve(this);
      });
    });
  }

  /**
   * Updates the storage with current state. Will only overwrite the
   * children enumerated in state.
   *
   * @author Roman Pushkin (roman.pushkin@gmail.com)
   * @date 2016-05-17
   * @version 1.1
   * @since 0.1.0
   * @param {function} callback - (optional) Executes callback when data saved.
   */
  save(callback = (() => {})) {
    this.db.update(this.state, callback);
  }

  /**
   * Updates selected properties. Doesn't affect other props. Useful
   * for bulk props update instead of doing `state.prop = 1` every time.
   *
   * @author Roman Pushkin (roman.pushkin@gmail.com)
   * @date 2016-05-17
   * @version 1.1
   * @since 0.1.0
   */
  setState(props) {
    objectAssign(this.state, props);
  }

  /**
   * Unsubscribes from storage updates.
   *
   * @author Roman Pushkin (roman.pushkin@gmail.com)
   * @date 2016-05-17
   * @version 1.1
   * @since 0.1.0
   */
  dispose() {
    this.db.off('value');
  }
}
