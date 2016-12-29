/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../src/routes'; // to aviod circular dependencies
import UpdateIdentity from '../../src/actions/menu/update-identity';
import { i18n } from '../spec-support';

const user = {};

test('can be constructed with default parameters and has type', t => {
  const action = new UpdateIdentity({ i18n, user });
  t.is(action.type, 'update-identity');
  t.pass();
});

test('should return composite response on call', t => {
  const action = new UpdateIdentity({ i18n, user });
  const response = action.call({
    first: 'foo',
    last: 'bar',
    username: 'ro31337',
  });
  t.is(response.type, 'user-state');
  t.deepEqual(response.state.identity, {
    first: 'foo',
    last: 'bar',
    username: 'ro31337',
  });
});
