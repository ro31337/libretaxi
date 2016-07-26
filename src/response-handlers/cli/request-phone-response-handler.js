import ResponseHandler from '../response-handler';
import inquirer from 'inquirer';

/**
 * "Request phone" response cli handler.
 * Prompts user to type phone number.
 * See also: {@link RequestPhoneResponse}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-24
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestPhoneResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'cli-request-phone-response-handler' }, options));
    this.lib = options.lib || inquirer;
  }

  /**
   * Handler entry point.
   * Prompts the user to type phone number.
   */
  call(onResult) {
    const q = [
      {
        type: 'input',
        name: 'phone',
        message: 'Your phone number',
        default: '(555) 111-22-33',
      },
    ];
    this.lib.prompt(q).then((answers) => {
      onResult(answers.phone);
    }).catch((err) => {
      console.log(`Error in RequestPhoneResponseHandler: ${err}`); // eslint-disable-line no-console
      onResult();
    });
  }
}
