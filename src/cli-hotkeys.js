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

/**
 * Cli hotkeys. Allows to execute function(s) on hotkeys in console.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-10
 * @version 1.1
 * @since 0.1.0
 */
class CliHotkeys {

  /**
   * Constructor.
   */
  constructor() {
    this.map = {};
    process.stdin.on('keypress', (ch, key) => {
      // handle only if Ctrl is pressed
      if (key && key.ctrl) {
        const callback = this.map[key.name];
        if (callback) callback.call(); // value type is InlineButtonCallback, we need to `.call()`
      }
    });
  }

  /**
   * Set callback for Ctrl + key
   *
   * @param {string} key - 1 letter string containing the key (any case).
   * @param {function} callback - callback to be executed on Ctrl + key
   */
  set(key, callback) {
    this.map[key.toLowerCase()] = callback;
  }

  /**
   * Clear all previously set hotkeys
   */
  clearAll() {
    this.map = {};
  }
}

/**
 * Stub cli hotkeys, implements empty {@link CliHotkeys} interface.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-10-10
 * @version 1.1
 * @since 0.1.0
 */
class StubCliHotkeys {
  set() {}
  clearAll() {}
}

const instance = process.env.TEST_ENVIRONMENT ? new StubCliHotkeys() : new CliHotkeys();

export default instance;
