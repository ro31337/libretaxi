import test from 'ava';
import stateful from '../src/stateful';

class Foo {
  test() {
    return 1;
  }
}

class Bar extends stateful(Foo) {
}

test('should work with base class', t => {
  const bar = new Bar();
  t.is(bar.test(), 1);
});
