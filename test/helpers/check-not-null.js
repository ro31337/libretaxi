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

import test from 'ava';
import objectAssign from 'object-assign';

module.exports = (props, f) => {
  const options = {};
  let arr = [];

  if (props instanceof Array) {
    arr = props;
  } else {
    arr.push(props);
  }

  // `props` can be string, and can be array.
  // `arr` is always array, containing one or more properties.

  for (const prop of arr) {
    // `clone` is always new object, containing more properties with each iteration.
    // For example:
    // {} - first iteration
    // { foo: true } <- second iteration
    // { foo: true, bar: true } <- third iteration
    // ...
    // last iteration always skipped, because all parameters are present, and
    // no exception is generated
    const clone = objectAssign({}, options);

    test.cb(`should check '${prop}' parameter for not null`, t => {
      const err = `'${prop}' parameter not specified`;
      t.throws(() => { f(clone); }, err);
      t.end();
    });

    options[prop] = true;
  }
};
