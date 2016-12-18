/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../src/routes'; // to aviod circular dependencies
import ShowMessage from '../../src/actions/menu/show-message';

const user = {
  state: { foo: 'bar' },
};

test('can be constructed with default parameters', t => {
  new ShowMessage({ i18n: {}, user });
  t.pass();
});

test('should return conditional response on call', t => {
  const action = new ShowMessage({ i18n: {}, user });
  const response = action.call({
    message: 'msg',
    path: 'passenger-index',
    expectedState: { a: 1, b: 2 },
  });
  t.is(response.type, 'if');
  t.is(response.condition.type, 'props-equal');
  t.deepEqual(response.condition.fragment, { a: 1, b: 2 });
  t.deepEqual(response.condition.master, { foo: 'bar' });
  t.is(response.ok.type, 'composite');
  t.is(response.ok.responses[0].type, 'interrupt-prompt');
  t.is(response.ok.responses[1].type, 'text');
  t.is(response.ok.responses[1].message, 'msg');
  t.is(response.ok.responses[2].type, 'redirect');
  t.is(response.ok.responses[2].path, 'passenger-index');
  t.falsy(response.err);
});
