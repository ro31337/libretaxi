/* eslint-disable no-new */
/* eslint-disable no-unused-vars */

import test from 'ava';
import stateful from '../src/stateful';

class Demo1 extends stateful() {
  constructor(key) {
    super();
  }
}

class Demo2 extends stateful() {
  constructor(key) {
    super();
    this.stateful = {
      table: 'demo',
    };
  }
}

class Demo3 extends stateful() {
  constructor(key) {
    super();
    this.stateful = {
      key: '1',
    };
  }
}

test.cb('should throw error when stateful not configured', t => {
  const err = 'stateful mixin not configured';

  t.throws(() => {
    new Demo1().load();
  }, err);

  t.end();
});

test.cb('should throw error when key not specified', t => {
  const err = 'stateful "key" parameter not specified';

  t.throws(() => {
    new Demo2().load();
  }, err);

  t.end();
});

test.cb('should throw error when table not specified', t => {
  const err = 'stateful "table" parameter not specified';

  t.throws(() => {
    new Demo3().load();
  }, err);

  t.end();
});
