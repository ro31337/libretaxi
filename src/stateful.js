require('dotenv').config();
import objectAssign from 'object-assign';
import Firebase from 'firebase';
import { ArgumentError } from './validations/errors';

/**
 * @typedef Stateful
 * @desc
 *
 * State storage mixin.
 *
 * Keeps state data, updates state when underlying storage updates.
 * Current implementation is using database. `STATEFUL_CONNSTR` should
 * be present in `.env`.
 *
 * Adds the following methods to class:
 *
 * * `load` - Loads data from the storage and inits database connection.
 * * `save` - Updates the storage with current state.
 * * `setState` - Updates selected properties. Doesn't affect other props.
 * * `dispose` - Unsubscribes from storage updates.
 *
 * See also: {@link StatefulKey}, source code for more information (esdoc is limited
 * when it comes to typedef).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ValidatedStateStorage}
 * @date 2016-05-20
 * @version 1.1
 * @since 0.1.0
 * @example
 * class Command extends stateful() {
 *    constructor() {
 *      super();
 *      this.stateful = {
 *        table: 'foo',
 *        key: 'cli_1_guid' // output from StatefulKey.toString()
 *      }
 *    }
 *  }
 *
 *  new Command().load().then((c) => {
 *    console.dir(c.state);
 *  });
 *
 * // with base class defined:
 *
 * class Foo extends stateful(Bar) { ... }
 */
const stateful = (superclass) => {
  let s = superclass;

  if (!s) {
    s = class Dummy {};
  }

  return class extends s {
    /**
     * Inits mixin.
     *
     * @author Roman Pushkin (roman.pushkin@gmail.com)
     * @date 2016-05-20
     * @version 1.1
     * @private
     * @since 0.1.0
     * @throws {ArgumentError} throw error `stateful` not specified
     * @throws {ArgumentError} throw error `stateful.key` not specified
     * @throws {ArgumentError} throw error `stateful.table` not specified
     */
    init() {
      if (!this.stateful) {
        throw new ArgumentError('stateful mixin not configured');
      }

      if (!this.stateful.key) {
        throw new ArgumentError('stateful "key" parameter not specified');
      }

      if (!this.stateful.table) {
        throw new ArgumentError('stateful "table" parameter not specified');
      }

      const key = this.stateful.key;
      const table = this.stateful.table;
      this.state = {};
      // remove trailing slash if any
      const str = process.env.STATEFUL_CONNSTR.replace(/\/$/, '');
      this.stateful.firebaseUrl = `${str}/${table}/${key}`;
    }

    /**
     * Loads data from the storage and inits database connection.
     * This method must be executed before using `save` or `dispose`.
     *
     * @author Roman Pushkin (roman.pushkin@gmail.com)
     * @date 2016-05-20
     * @version 1.1
     * @since 0.1.0
     * @return {Promise} promise that resolves when data has been loaded.
     */
    load() {
      this.init();
      return new Promise((resolve) => {
        this.db = new Firebase(this.stateful.firebaseUrl);
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
     * @date 2016-05-20
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
     * This method doesn't update database.
     *
     * @author Roman Pushkin (roman.pushkin@gmail.com)
     * @date 2016-05-20
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
     * @date 2016-05-20
     * @version 1.1
     * @since 0.1.0
     */
    dispose() {
      this.db.off('value');
    }
  };
};

export default stateful;
