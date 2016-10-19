/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../src/routes'; // to aviod circular dependencies
import SaveAndRedirect from '../../src/actions/menu/save-and-redirect';
import { i18n } from '../spec-support';

const user = {};

test('can be constructed with default parameters and has type', t => {
  const action = new SaveAndRedirect({ i18n, user });
  t.is(action.type, 'save-and-redirect');
  t.pass();
});

test('should return composite response on call', t => {
  const action = new SaveAndRedirect({ i18n, user });
  const response = action.call({ foo: 'bar', path: 'blank-screen' });
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'user-state');
  t.deepEqual(response.responses[0].state.redirectArgs, { foo: 'bar', path: 'blank-screen' });
  t.is(response.responses[1].type, 'redirect');
  t.is(response.responses[1].path, 'blank-screen');
});
