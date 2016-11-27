import ResponseHandler from '../response-handler';
import GoogleMapsLink from '../../decorators/location/google-maps-link';

/**
 * Map response cli handler.
 * Prints google maps link from {@link MapResponse} to console.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-11-26
 * @version 1.1
 * @since 0.1.0
 */
export default class MapResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'cli-map-response-handler' }, options));
  }

  /**
   * Handler entry point.
   * Print google maps link to console.
   */
  call(onResult) {
    console.log(new GoogleMapsLink(this.response.location).toString()); // eslint-disable-line no-console, max-len
    onResult();
  }
}
