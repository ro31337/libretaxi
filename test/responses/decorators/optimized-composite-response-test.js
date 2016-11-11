/* eslint-disable no-new, max-len */
import test from 'ava';
import CompositeResponse from '../../../src/responses/composite-response';
import OptimizedCompositeResponse from '../../../src/responses/decorators/optimized-composite-response';
import checkNotNullTest from '../../helpers/check-not-null.js';
import TextResponse from '../../../src/responses/text-response';
import OptionsResponse from '../../../src/responses/options-response';
import IfResponse from '../../../src/responses/if-response';

checkNotNullTest('origin', (args) => { new OptimizedCompositeResponse(args); });

test('can be constructed with default parameters', t => {
  const r = new OptimizedCompositeResponse({ origin: new CompositeResponse() });
  t.is(r.type, 'optimized-composite');
  t.is(r.origin.type, 'composite');
});

test('should not fail on non-optimizable responses', t => {
  const origin1 = new CompositeResponse();
  const origin2 = new CompositeResponse().add(new TextResponse({ message: 'foo' }));
  const origin3 = new CompositeResponse().add(
    new OptionsResponse({ rows: [[{ label: 'Ok', value: 'ok' }]] }));
  const rr1 = new OptimizedCompositeResponse({ origin: origin1 }).responses;
  const rr2 = new OptimizedCompositeResponse({ origin: origin2 }).responses;
  const rr3 = new OptimizedCompositeResponse({ origin: origin3 }).responses;
  t.is(rr1.length, 0);
  t.is(rr2.length, 1);
  t.is(rr3.length, 1);
});

test('should optimize basic response', t => {
  const origin = new CompositeResponse()
    .add(new TextResponse({ message: 'foo' }))
    .add(new OptionsResponse({ rows: [[{ label: 'Ok', value: 'ok' }]] }));
  const optimized = new OptimizedCompositeResponse({ origin });
  t.is(optimized.responses.length, 1);
  t.is(optimized.responses[0].type, 'options');
  t.is(optimized.responses[0].message, 'foo');
});

test('should optimize nested response', t => {
  const origin = new CompositeResponse()
    .add(new CompositeResponse()
      .add(new TextResponse({ message: 'foo' }))
      .add(new OptionsResponse({ rows: [[{ label: 'Ok', value: 'ok' }]] }))
    );
  const optimized = new OptimizedCompositeResponse({ origin });
  t.is(optimized.responses.length, 1);
  t.is(optimized.responses[0].type, 'composite');
  t.is(optimized.responses[0].responses.length, 1);
  t.is(optimized.responses[0].responses[0].type, 'options');
  t.is(optimized.responses[0].responses[0].message, 'foo');
});

test('should optimize nested response with if', t => {
  const origin = new CompositeResponse()
    .add(new CompositeResponse()
      .add(new IfResponse({
        condition: {},
        ok: new CompositeResponse()
          .add(new TextResponse({ message: 'foo' }))
          .add(new OptionsResponse({ rows: [[{ label: 'Ok', value: 'ok' }]] })),
        err: new CompositeResponse()
          .add(new TextResponse({ message: 'bar' }))
          .add(new OptionsResponse({ rows: [[{ label: 'Ok', value: 'ok' }]] })),
      }))
    );
  const optimized = new OptimizedCompositeResponse({ origin });
  t.is(optimized.responses.length, 1);
  t.is(optimized.responses[0].type, 'composite');
  t.is(optimized.responses[0].responses.length, 1);
  t.is(optimized.responses[0].responses[0].type, 'if');
  t.is(optimized.responses[0].responses[0].ok.type, 'composite');
  t.is(optimized.responses[0].responses[0].ok.responses.length, 1);
  t.is(optimized.responses[0].responses[0].ok.responses[0].type, 'options');
  t.is(optimized.responses[0].responses[0].ok.responses[0].message, 'foo');
  t.is(optimized.responses[0].responses[0].err.type, 'composite');
  t.is(optimized.responses[0].responses[0].err.responses.length, 1);
  t.is(optimized.responses[0].responses[0].err.responses[0].type, 'options');
  t.is(optimized.responses[0].responses[0].err.responses[0].message, 'bar');
});
