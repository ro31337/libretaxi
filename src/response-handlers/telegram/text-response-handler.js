import ResponseHandler from '../response-handler';

/**
 * Text response telegram handler.
 * Prints {@link TextResponse} message to telegram.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-01
 * @version 1.1
 * @since 0.1.0
 */
export default class TextResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'telegram-text-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Prints the message to telegram.
   */
  call(onResult) {
    this.api.sendMessage(this.user.platformId, this.response.message,
      {
        reply_markup: JSON.stringify({ hide_keyboard: true }),
      });
    onResult();
  }
}
