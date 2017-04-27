/* eslint-disable no-new */
import test from 'ava';
import Action from '../src/action';
import checkNotNullTest from './helpers/check-not-null.js';
import { i18n } from './spec-support';

checkNotNullTest(['i18n', 'type', 'user'], (args) => { new Action(args); });
const user = {};

test('can be constructed with default parameters', t => {
  new Action({ i18n, type: 'foo', user });
  t.pass();
});

test.cb('should throw error when for missing methods', t => {
  const err = 'not implemented';
  const action = new Action({ i18n, type: 'foo', user });

  t.throws(() => { action.post(); }, err);
  t.throws(() => { action.get(); }, err);

  t.end();
});

test('should set state if not specified', t => {
  const action = new Action({ i18n, type: 'foo', user });
  t.truthy(action.state);
  t.pass();
});

test('should set state if specified', t => {
  const action = new Action({ i18n, state: { a: 1 }, type: 'foo', user });
  t.is(action.state.a, 1);
  t.pass();
});

test.cb('should call get on `call` when arg is not provided', t => {
  const action = new Action({ i18n, type: 'foo', user });
  action.get = () => {
    t.pass();
    t.end();
  };
  action.call();
});

test.cb('should call post on `call` when arg is provided', t => {
  const action = new Action({ i18n, type: 'foo', user });
  action.post = (arg) => {
    t.is(arg, 123);
    t.end();
  };
  action.call(123);
});

test('translation helper method should work', t => {
  const action = new Action({ i18n, type: 'select-user-type', user });
  t.is(action.t('who_you_are'), 'Who are you? (you can change this later)');
});

test('global translation helper method should work', t => {
  const action = new Action({ i18n, type: 'foo', user });
  t.is(action.gt('location_button_text'), 'Send location');
});
