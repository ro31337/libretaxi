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
