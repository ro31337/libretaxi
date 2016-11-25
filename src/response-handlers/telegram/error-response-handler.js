import ResponseHandler from '../response-handler';

/**
 * Error response telegram handler.
 * Send message from {@link ErrorResponse} to Telegram user.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-16
 * @version 1.1
 * @since 0.1.0
 */
export default class ErrorResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'telegram-error-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Send message prefixed with ❌ to Telegram user.
   */
  call(onResult) {
    this.api.sendMessage(this.user.platformId, `❌ ${this.response.message}`,
      {
        disable_notification: true,
        reply_markup: JSON.stringify({ hide_keyboard: true }),
      });
    onResult();
  }
}
