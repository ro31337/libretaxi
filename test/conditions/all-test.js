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
import All from '../../src/conditions/all';
import { ss } from '../spec-support';

test('can be constructed with default parameters', t => {
  const c = new All(1, 2, 3);
  t.is(c.type, 'all');
});

test('should be callable and truthy if no params provided', t => {
  const c = new All();
  t.is(c.call(), true);
});

test('should work for one condition when condition returns true', t => {
  const one = {
    call: ss.sinon.stub().returns(true),
  };
  const c = new All(
    one
  );
  t.is(c.call(), true);
  t.is(one.call.calledWith(), true);
});

test('should work for one condition when condition returns false', t => {
  const one = {
    call: ss.sinon.stub().returns(false),
  };
  const c = new All(
    one
  );
  t.is(c.call(), false);
  t.is(one.call.calledWith(), true);
});

test('should return true when multiple conditions return true', t => {
  const one = {
    call: ss.sinon.stub().returns(true),
  };
  const two = {
    call: ss.sinon.stub().returns(true),
  };
  const c = new All(
    one,
    two,
  );
  t.is(c.call(), true);
  t.is(one.call.calledWith(), true);
  t.is(two.call.calledWith(), true);
});

test('should return false when one of conditions returns false', t => {
  const one = {
    call: ss.sinon.stub().returns(true),
  };
  const two = {
    call: ss.sinon.stub().returns(false),
  };
  const c = new All(
    one,
    two,
  );
  t.is(c.call(), false);
  t.is(one.call.calledWith(), true);
  t.is(two.call.calledWith(), true);
});
