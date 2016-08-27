import Action from '../../action';
import EmptyResponse from '../../responses/empty-response';

/**
 * Blank screen menu action. Does nothing, there is no way to get out of
 * this menu action. User can be redirected only from outside (i.e. another
 * action was executed as result of some kind of event).
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-08-26
 * @version 1.1
 * @since 0.1.0
 */
export default class BlankScreen extends Action {
  /**
   * Constructor.
   */
  constructor(options) {
    super(Object.assign({ type: 'blank-screen' }, options));
  }

  /**
   * Returns empty response.
   *
   * @return {EmptyResponse} - returns empty response
   */
  get() {
    return new EmptyResponse();
  }

  /**
   * Returns empty response.
   *
   * @return {EmptyResponse} - returns empty response
   */
  post() {
    return new EmptyResponse();
  }
}
