/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import RemoveUser from '../../../src/actions/menu/system/remove-user';
import { i18n } from '../../spec-support';

const user = {
  userKey: 'cli_1',
  state: {},
};

test('can be constructed with default parameters', t => {
  new RemoveUser({ i18n, user });
  t.pass();
});

test('should return composite response on call', t => {
  const action = new RemoveUser({ i18n, user });
  const response = action.call();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, '👌 OK!');
  t.is(response.responses[1].type, 'remove-user');
});
