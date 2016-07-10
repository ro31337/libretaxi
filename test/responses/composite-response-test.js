/* eslint-disable no-new */
import test from 'ava';
import TextResponse from '../../src/responses/text-response';
import CompositeResponse from '../../src/responses/composite-response';

test('can be constructed with default parameters', t => {
  const r = new CompositeResponse();
  t.is(r.type, 'composite');
});

test('should have "responses" property initialized', t => {
  const r = new CompositeResponse();
  t.truthy(r.responses);
});

test('should add responses', t => {
  const r = new CompositeResponse()
    .add(new TextResponse({ message: 'one' }))
    .add(new TextResponse({ message: 'two' }))
    .add(new TextResponse({ message: 'three' }));

  t.is(r.responses.length, 3);
});
