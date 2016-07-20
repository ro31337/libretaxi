import Action from '../action';
import objectAssign from 'object-assign';

/**
 * Select locale menu action, stubbed for now.
 *
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-05-26
 * @version 1.2
 * @since 0.1.0
 */
export default class SelectLocale extends Action {

  /**
   * Constructor.
   */
  constructor(options) {
    super(objectAssign({ type: 'select-locale' }, options));
  }

  /**
   * Stub method
   *
   * @return {string} Returns `bar`
   */
  foo() {
    return 'bar';
  }
}
