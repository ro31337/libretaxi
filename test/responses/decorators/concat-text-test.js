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

test('should not optimize basic response when second message is important', t => {
  const origin = new CompositeResponse()
    .add(new TextResponse({ message: 'foo' }))
    .add(new TextResponse({ message: 'bar', important: true }));
  const optimized = new ConcatText(origin);
  t.is(optimized.responses.length, 2);
  t.is(optimized.responses[0].type, 'text');
  t.is(optimized.responses[0].message, 'foo');
  t.is(optimized.responses[1].type, 'text');
  t.is(optimized.responses[1].message, 'bar');
});

test('should not optimize basic response when first message is important', t => {
  const origin = new CompositeResponse()
    .add(new TextResponse({ message: 'foo', important: true }))
    .add(new TextResponse({ message: 'bar' }));
  const optimized = new ConcatText(origin);
  t.is(optimized.responses.length, 2);
  t.is(optimized.responses[0].type, 'text');
  t.is(optimized.responses[0].message, 'foo');
  t.is(optimized.responses[1].type, 'text');
  t.is(optimized.responses[1].message, 'bar');
});
