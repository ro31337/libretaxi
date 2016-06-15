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
