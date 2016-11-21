import ResponseHandler from '../response-handler';
import inquirer from 'inquirer';

/**
 * Interrupts input for Inquirer.js library. See {@link InterruptPromptResponse} for details.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-09-29
 * @version 1.1
 * @since 0.1.0
 */
export default class InterruptPromptResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} response - {@link InterruptPromptResponse} instance.
   */
  constructor(options) {
    super(Object.assign({ type: 'cli-interrupt-prompt-response-handler' }, options));
    this.inquirer = options.inquirer || inquirer;
  }

  /**
   * Handler entry point.
   * Interrupts input for Inquirer.js library. Calls `onResult` when done.
   */
  call(onResult) {
    this.inquirer.interruptPrompt(onResult);
  }
}
