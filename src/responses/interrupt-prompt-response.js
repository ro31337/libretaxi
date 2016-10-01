import Response from './response';

/**
 * "Interrupt input" response. Used to interrupt CLI (at the moment) user input.
 * Inquirer.js library provides nice options and you can select one of them. For example,
 * in {@link DriverIndex} menu action. But there should be way to interrupt this library, so
 * action from outside can happen. For example, there is new order, and we must redirect user
 * to another menu action (or just show a text). Here is when "interrupt input" response comes
 * into play.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {Response}
 * @date 2016-09-29
 * @version 1.1
 * @since 0.1.0
 */
export default class InterruptPromptResponse extends Response {
  /**
   * Constructor.
   */
  constructor() {
    super({ type: 'interrupt-prompt' });
  }
}
