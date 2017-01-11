/* eslint-disable no-console */
import ResponseHandler from '../response-handler';

/**
 * Map response Telegram handler.
 * Handles {@link MapResponse} and send location as a map to Telegram user.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-27
 * @version 1.1
 * @since 0.1.0
 */
export default class MapResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'telegram-map-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Send location as a map to Telegram user.
   */
  call(onResult) {
    this.api.sendLocation(
      this.user.platformId,
      this.response.location[0],
      this.response.location[1],
      {
        disable_notification: true,
      }).catch(console.log.bind(console));
    onResult();
  }
}
