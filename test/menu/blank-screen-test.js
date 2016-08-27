/* eslint-disable no-new */
import test from 'ava';
import BlankScreen from '../../src/actions/menu/blank-screen';

const user = {};

test('can be constructed with default parameters', t => {
  new BlankScreen({ i18n: {}, user });
  t.pass();
});

test('should return \'empty\' response on get', t => {
  const action = new BlankScreen({ i18n: {}, user });
  const response = action.get();
  t.is(response.type, 'empty');
});

test('should return \'empty\' response on post', t => {
  const action = new BlankScreen({ i18n: {}, user });
  const response = action.post();
  t.is(response.type, 'empty');
});
