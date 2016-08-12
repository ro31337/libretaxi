import ResponseHandler from '../response-handler';
import inquirer from 'inquirer';

/**
 * "Request user input" response cli handler.
 * Prompts user to type a message.
 * See also: {@link RequestUserInputResponse}.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-08-11
 * @version 1.1
 * @since 0.1.0
 */
export default class RequestUserInputResponseHandler extends ResponseHandler {
  constructor(options) {
    super(Object.assign({ type: 'cli-request-user-input-response-handler' }, options));
    this.lib = options.lib || inquirer;
  }

  /**
   * Handler entry point.
   * Prompts the user to type a message.
   */
  call(onResult) {
    const q = [
      {
        type: 'input',
        name: 'message',
        message: 'Your input:',
      },
    ];
    this.lib.prompt(q).then((data) => {
      onResult(data.message);
    }).catch((err) => {
      console.log(`Error in RequestUserInputResponseHandler: ${err}`); // eslint-disable-line no-console, max-len
      onResult();
    });
  }
}
