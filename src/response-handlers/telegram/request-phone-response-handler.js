import ResponseHandler from '../response-handler';

/**
 * "Request phone" response Telegram handler.
 * Prompts user to send phone number with the button.
 * See also: {@link RequestPhoneResponse}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-12
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestPhoneResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'telegram-request-phone-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Prompts the user to send phone number.
   */
  call() {
    const message = this.response.message || 'Send number by clicking the button below';
    const buttonText = this.response.buttonText || 'Send number';
    this.api.sendMessage(this.user.platformId, message,
      {
        reply_markup: JSON.stringify({
          keyboard: [[{ text: buttonText, request_contact: true }]],
          one_time_keyboard: true,
        }),
      });
  }
}
