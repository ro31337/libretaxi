import ResponseHandler from '../response-handler';

/**
 * Options response Telegram handler.
 * Send the list of options for {@link OptionsResponse} as keyboard to the client.
 * On Telegram side this allows a user to select the value from the list.
 * Important: This handler doesn't call onResult callback with selected value, result value
 * should be posted back to current menu action from the main Telegram loop.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-04
 * @version 1.1
 * @since 0.1.0
 */
export default class OptionsResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} options - see {@link ResponseHandler}
   */
  constructor(options) {
    super(Object.assign({ type: 'telegram-options-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Send the list of options as keyboard to the client.
   */
  call() {
    // convert rows to Telegram compatible rows
    const rows = Array.from(this.response.rows, row => Array.from(row, o => o.label));

    const message = this.response.message || 'Your choice?';
    this.api.sendMessage(this.user.platformId, message,
      {
        reply_markup: JSON.stringify({ keyboard: rows }),
      });
  }
}
