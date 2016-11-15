import ResponseHandler from '../response-handler';

/**
 * "Request location" response Telegram handler.
 * Prompts user to send location with the button.
 * See also: {@link RequestPhoneResponse}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-14
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestLocationResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'telegram-request-location-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Prompts the user to send location.
   */
  call() {
    const message = this.response.message || 'Send location by clicking the button below';
    const buttonText = this.response.buttonText || 'Send location';
    this.api.sendMessage(this.user.platformId, message,
      {
        reply_markup: JSON.stringify({
          keyboard: [[{ text: buttonText, request_location: true }]],
          one_time_keyboard: true,
        }),
      });
  }
}
