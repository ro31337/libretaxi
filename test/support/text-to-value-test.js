/* eslint-disable no-new */
import test from 'ava';
import textToValue from '../../src/support/text-to-value';
import ActionFactory from '../../src/factories/action-factory';
import Action from '../../src/action';
import OptionsResponse from '../../src/responses/options-response';

class Foo extends Action {
  constructor(options) {
    super(Object.assign({ type: 'foo' }, options));
  }

  get() {
    return new OptionsResponse({ rows: [
      [{ label: 'OK', value: '_ok_' }, { label: 'Cancel', value: '_cancel_' }],
    ] });
  }

  post() {
    return new OptionsResponse({ rows: [
      [{ label: 'OK2', value: '_ok2_' }, { label: 'Cancel2', value: '_cancel2_' }],
    ] });
  }
}

const user = { state: {} };

test('should convert text to value for the action', t => {
  ActionFactory.fromRoute = () => new Foo({ i18n: {}, user });
  t.is(textToValue(user, 'OK'), '_ok_');
  t.is(textToValue(user, 'Cancel'), '_cancel_');
  t.is(textToValue(user, 'OK2'), 'OK2'); // should ignore post method
  t.is(textToValue(user, 'Cancel2'), 'Cancel2'); // should ignore post method
  t.is(textToValue(user, 'foo'), 'foo');
});
