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

/* eslint-disable no-new, no-useless-constructor */
import test from 'ava';
import checkNotNull from '../../src/validations/check-not-null.js';
import { mix } from 'mixwith';

// one parameter
class Foo1 extends mix(class {}).with(checkNotNull('bar')) {
  constructor(options) { super(options); }
}

// array of parameters
class Foo2 extends mix(class {}).with(checkNotNull(['bar', 'buz'])) {
  constructor(options) { super(options); }
}

// combinations
class Foo3 extends mix(class {}).with(checkNotNull(['bar', 'buz']), checkNotNull('qux')) {
  constructor(options) { super(options); }
}

// no parameters provided to `checkNotNull`
class Foo4 extends mix(class {}).with(checkNotNull()) {
  constructor(options) { super(options); }
}

test('should allow to construct objects when prop(s) are specified', t => {
  new Foo1({ bar: 1 });
  new Foo2({ bar: 1, buz: 2 });
  new Foo3({ bar: 1, buz: 2, qux: 3 });
  t.pass();
});

test.cb('should throw exception when parameters not specified at all', t => {
  const err = 'parameters not specified';
  t.plan(3);

  t.throws(() => { new Foo1(); }, err);
  t.throws(() => { new Foo2(); }, err);
  t.throws(() => { new Foo3(); }, err);

  t.end();
});

test.cb('should throw exception when required parameter(s) not specified', t => {
  const err = '\'bar\' parameter not specified';
  t.plan(3);

  t.throws(() => { new Foo1({ notRequired: 1 }); }, err);
  t.throws(() => { new Foo2({ notRequired: 1 }); }, err);
  t.throws(() => { new Foo3({ notRequired: 1 }); }, err);

  t.end();
});

test.cb('should check array of parameters', t => {
  const err1 = '\'bar\' parameter not specified';
  const err2 = '\'buz\' parameter not specified';
  t.plan(2);

  t.throws(() => { new Foo2({ buz: 1 }); }, err1);
  t.throws(() => { new Foo2({ bar: 1 }); }, err2);

  t.end();
});

test.cb('should check combinations', t => {
  const err1 = '\'bar\' parameter not specified';
  const err2 = '\'buz\' parameter not specified';
  const err3 = '\'qux\' parameter not specified';
  t.plan(3);

  t.throws(() => { new Foo3({ buz: 2, qux: 3 }); }, err1);
  t.throws(() => { new Foo3({ bar: 1, qux: 3 }); }, err2);
  t.throws(() => { new Foo3({ bar: 1, buz: 2 }); }, err3);

  t.end();
});

test('should check if consturctor options present when no params provided for mixin', t => {
  new Foo4('bar');
  t.pass();
});
