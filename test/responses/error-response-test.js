/* eslint-disable no-new */
import test from 'ava';
import ErrorResponse from '../../src/responses/error-response';

test('can be constructed with default parameters', t => {
  new ErrorResponse({ message: 'error' });
  t.pass();
});

test('should save message as property and have type', t => {
  const r = new ErrorResponse({ message: 'this is an error' });
  t.is(r.message, 'this is an error');
  t.is(r.type, 'error');
});

test.cb('should throw argument error when message not specified', t => {
  const err = 'message parameter not specified';

  t.throws(() => {
    new ErrorResponse();
  }, err);

  t.end();
});
