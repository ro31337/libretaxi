/* eslint-disable arrow-body-style */
import ResponseHandler from '../response-handler';

/**
 * Inline options response Telegram handler.
 * Send {@link InlineOptionsResponse} buttons to user.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-19
 * @version 1.1
 * @since 0.1.0
 */
export default class InlineOptionsResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @type Object
   * @param {User} options.user - user
   */
  constructor(options) {
    super(Object.assign({ type: 'telegram-inline-options-response-handler' }, options));
    this.user = options.user;
  }

  /**
   * Handler entry point.
   * Send the list of inline buttons to the user.
   */
  call(onResult) {
    // convert rows to Telegram compatible rows
    const rows = Array.from(this.response.rows, row => Array.from(row, (o) => {
      return {
        text: o.label,
        callback_data: o.value,
      };
    }));

    const message = this.response.message || this.response.defaultMessage || 'Your choice?';
    this.api.sendMessage(this.user.platformId, message,
      {
        reply_markup: JSON.stringify({ inline_keyboard: rows }),
      });

    onResult();
  }
}
