/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../src/routes'; // to aviod circular dependencies
import Redirect from '../../src/actions/menu/redirect';
import { i18n } from '../spec-support';

const user = {};

test('can be constructed with default parameters and have type', t => {
  const action = new Redirect({ i18n, user });
  t.is(action.type, 'redirect');
  t.pass();
});

test('should return redirect response', t => {
  const action = new Redirect({ i18n, user });
  const response = action.call('foo');
  t.is(response.type, 'redirect');
  t.is(response.path, 'foo');
});
