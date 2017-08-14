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
import IfResponse from '../../src/responses/if-response';
import checkNotNullTest from '../helpers/check-not-null.js';

checkNotNullTest(['condition', 'ok'], (args) => { new IfResponse(args); });

test('can be constructed with default parameters', t => {
  new IfResponse({ condition: {}, ok: {} });
  new IfResponse({ condition: {}, ok: {}, err: {} });
  t.pass();
});

test('instance should have all props defined', t => {
  const condition = {};
  const ok = {};
  const r = new IfResponse({ condition, ok });
  t.is(r.condition, condition);
  t.is(r.ok, ok);
  t.falsy(r.err);
});

test('instance should have all props defined when optional parameter present', t => {
  const condition = {};
  const ok = {};
  const err = {};
  const r = new IfResponse({ condition, ok, err });
  t.is(r.condition, condition);
  t.is(r.ok, ok);
  t.is(r.err, err);
});
