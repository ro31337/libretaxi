/* eslint-disable no-console */
import ResponseHandler from '../response-handler';
import objectAssign from 'object-assign';
import hotkeys from '../../cli-hotkeys';

/**
 * Inline options response cli handler.
 * Prints {@link InlineOptionsResponse} buttons and their hotkeys to console.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-10-10
 * @version 1.1
 * @since 0.1.0
 */
export default class InlineOptionsResponseHandler extends ResponseHandler {
  constructor(options) {
    super(objectAssign({ type: 'inline-options-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Prints the list of options and their corresponding hotkeys to console.
   */
  call(onResult) {
    hotkeys.clearAll();

    const ss = [];
    let i = 0;

    for (const row of this.response.rows) {
      for (const o of row) {
        const key = 'QWERTYUIOP'[i];
        ss.push(`[${o.label}] (^${key})`);
        hotkeys.set(key, () => console.log(`You pressed ^${key}, value is ${o.value}`));
        i++;
      }
    }

    console.log(ss.join(', '));
    onResult();
  }
}
