/* eslint-disable no-new, max-len */
import test from 'ava';
import CompositeResponse from '../../../src/responses/composite-response';
import ConcatText from '../../../src/responses/decorators/concat-text';
import TextResponse from '../../../src/responses/text-response';
import OptionsResponse from '../../../src/responses/options-response';
import IfResponse from '../../../src/responses/if-response';

test('can be constructed with default parameters', t => {
  const r = new ConcatText(new CompositeResponse());
  t.is(r.type, 'composite');
  t.is(r.origin.type, 'composite');
});

test('should not fail on non-optimizable responses', t => {
  const origin1 = new CompositeResponse();
  const origin2 = new CompositeResponse().add(new TextResponse({ message: 'foo' }));
  const origin3 = new CompositeResponse().add(
    new OptionsResponse({ rows: [[{ label: 'Ok', value: 'ok' }]] }));
  const rr1 = new ConcatText(origin1).responses;
  const rr2 = new ConcatText(origin2).responses;
  const rr3 = new ConcatText(origin3).responses;
  t.is(rr1.length, 0);
  t.is(rr2.length, 1);
  t.is(rr3.length, 1);
});

test('should optimize basic response', t => {
  const origin = new CompositeResponse()
    .add(new TextResponse({ message: 'foo' }))
    .add(new TextResponse({ message: 'bar' }));
  const optimized = new ConcatText(origin);
  t.is(optimized.responses.length, 1);
  t.is(optimized.responses[0].type, 'text');
  t.is(optimized.responses[0].message, 'foo bar');
});

test('should optimize basic response when first message more than 20 chars', t => {
  const origin = new CompositeResponse()
    .add(new TextResponse({ message: '012345678901234567890' }))
    .add(new TextResponse({ message: 'bar' }));
  const optimized = new ConcatText(origin);
  t.is(optimized.responses.length, 1);
  t.is(optimized.responses[0].type, 'text');
  t.is(optimized.responses[0].message, '012345678901234567890\nbar');
});

test('should optimize nested response', t => {
  const origin = new CompositeResponse()
    .add(new CompositeResponse()
      .add(new TextResponse({ message: 'foo' }))
      .add(new TextResponse({ message: 'bar' }))
    );
  const optimized = new ConcatText(origin);
  t.is(optimized.responses.length, 1);
  t.is(optimized.responses[0].type, 'composite');
  t.is(optimized.responses[0].responses.length, 1);
  t.is(optimized.responses[0].responses[0].type, 'text');
  t.is(optimized.responses[0].responses[0].message, 'foo bar');
});

test('should optimize nested response with more than 2 responses', t => {
  const origin = new CompositeResponse()
    .add(new CompositeResponse()
      .add(new TextResponse({ message: 'foo' }))
      .add(new TextResponse({ message: 'bar' }))
      .add(new TextResponse({ message: 'baz' }))
      .add(new TextResponse({ message: 'qux' }))
    );
  const optimized = new ConcatText(origin);
  t.is(optimized.responses.length, 1);
  t.is(optimized.responses[0].type, 'composite');
  t.is(optimized.responses[0].responses.length, 1);
  t.is(optimized.responses[0].responses[0].type, 'text');
  t.is(optimized.responses[0].responses[0].message, 'foo bar baz qux');
});

test('should optimize nested response with if', t => {
  const origin = new CompositeResponse()
    .add(new CompositeResponse()
      .add(new IfResponse({
        condition: {},
        ok: new CompositeResponse()
          .add(new TextResponse({ message: 'foo' }))
          .add(new TextResponse({ message: 'bar' })),
        err: new CompositeResponse()
          .add(new TextResponse({ message: 'baz' }))
          .add(new TextResponse({ message: 'qux' })),
      }))
    );
  const optimized = new ConcatText(origin);
  t.is(optimized.responses.length, 1);
  t.is(optimized.responses[0].type, 'composite');
  t.is(optimized.responses[0].responses.length, 1);
  t.is(optimized.responses[0].responses[0].type, 'if');
  t.is(optimized.responses[0].responses[0].ok.type, 'composite');
  t.is(optimized.responses[0].responses[0].ok.responses.length, 1);
  t.is(optimized.responses[0].responses[0].ok.responses[0].type, 'text');
  t.is(optimized.responses[0].responses[0].ok.responses[0].message, 'foo bar');
  t.is(optimized.responses[0].responses[0].err.type, 'composite');
  t.is(optimized.responses[0].responses[0].err.responses.length, 1);
  t.is(optimized.responses[0].responses[0].err.responses[0].type, 'text');
  t.is(optimized.responses[0].responses[0].err.responses[0].message, 'baz qux');
});
