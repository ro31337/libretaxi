/*
    LibreTaxi, free and open source ride sharing platform.
    Copyright (C) 2016-2017  Roman Pushkin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

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
