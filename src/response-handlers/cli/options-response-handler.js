import ResponseHandler from '../response-handler';
import inquirer from 'inquirer';

/**
 * Options response cli handler.
 * Prints the list of options for {@link OptionsResponse} to the console and
 * allows user to select the value from the list. Calls onResult callback
 * with selected value.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @extends {ResponseHandler}
 * @date 2016-07-14
 * @version 1.1
 * @since 0.1.0
 */
export default class OptionsResponseHandler extends ResponseHandler {

  /**
   * Constructor.
   *
   * @param {Object} options - see {@link ResponseHandler}
   * @param {Object} options.lib - dependency injection of console library
   */
  constructor(options) {
    super(options);
    this.lib = options.lib || inquirer;
  }

  /**
   * Handler entry point.
   * Displays the list of options to the console.
   * @param {function} onResult - this callback will be executed on user
   * choice with selected value as callback parameter.
   */
  call(onResult) {
    // flatten array of rows into the single list and
    // replace `label` with `name`
    const choices = [];

    for (const row of this.response.rows) {
      for (const o of row) {
        choices.push({ name: o.label, value: o.value });
      }
    }

    // use Inquirer library to show the list of options
    this.lib.prompt([
      {
        type: 'list',
        name: 'value',
        message: 'Your choice?',
        choices,
      },
    ]).then((result) => {
      onResult(result.value);
    }).catch((err) => {
      console.log(`Error in OptionsResponseHandler: ${err}`); // eslint-disable-line no-console
    });
  }
}
