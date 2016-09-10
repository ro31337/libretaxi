/* eslint-disable no-new, no-console */
import test from 'ava';
import IfResponseHandler from '../../src/response-handlers/if-response-handler';
import IfResponse from '../../src/responses/if-response';
import TextResponse from '../../src/responses/text-response';

// sample condition

class Equals {
  constructor(actual, expected) {
    this.actual = actual;
    this.expected = expected;
  }

  call() {
    return this.actual === this.expected;
  }
}

test('can be constructed with default parameters', t => {
  const h = new IfResponseHandler({ response: {}, user: {} });
  t.is(h.type, 'if-response-handler');
  t.pass();
});


test.cb('should call ok response when condition truthy', t => {
  let result = '';
  const user = { platformType: 'cli' };
  const ok = new TextResponse({ message: 'okay' });
  const err = new TextResponse({ message: 'error' });
  const condition = new Equals(2 + 2, 4);
  const tmp = console.log;
  console.log = (arg) => {
    result += arg;
  };

  const response = new IfResponse({ condition, ok, err });

  const h = new IfResponseHandler({ response, user });
  h.call(() => {
    t.is(result, 'okay');
    console.log = tmp;
    t.end();
  });
});

test.cb('should call err response when condition falsy', t => {
  let result = '';
  const user = { platformType: 'cli' };
  const ok = new TextResponse({ message: 'okay' });
  const err = new TextResponse({ message: 'error' });
  const condition = new Equals(2 + 2, 5);
  const tmp = console.log;
  console.log = (arg) => {
    result += arg;
  };

  const response = new IfResponse({ condition, ok, err });

  const h = new IfResponseHandler({ response, user });
  h.call(() => {
    t.is(result, 'error');
    console.log = tmp;
    t.end();
  });
});

test.cb('should not call anything when err isn\'t defined and condition falsy', t => {
  let result = '';
  const user = { platformType: 'cli' };
  const ok = new TextResponse({ message: 'okay' });
  const condition = new Equals(2 + 2, 5);
  const tmp = console.log;
  console.log = (arg) => {
    result += arg;
  };

  const response = new IfResponse({ condition, ok });

  const h = new IfResponseHandler({ response, user });
  h.call(() => {
    t.falsy(result);
    console.log = tmp;
    t.end();
  });
});
