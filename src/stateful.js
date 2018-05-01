/*
    LibreTaxi, free and open source ride sharing platform.
    Copyright (C) 2016-2017  Roman Pushkin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import firebaseDB from './firebase-db';
import { ArgumentError } from './validations/errors';

/**
 * @typedef Stateful
 * @desc
 *
 * State storage mixin.
 *
 * Keeps state data, updates state when underlying storage updates.
 * Current implementation is using database. `STATEFUL_CONNSTR` should
 * be present in `settings.js`.
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
    s = class {};
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
      this.firebasePath = `${table}/${key}`;
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
        this.db = firebaseDB.config().ref(this.firebasePath);
        this.db.on('value', (snapshot) => {
          const value = snapshot.val();

          if (value) {
            Object.assign(this.state, value);
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
      Object.assign(this.state, props);
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
