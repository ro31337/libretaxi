/* eslint-disable no-new */
import test from 'ava';
import OptionsMap from '../../src/support/options-map';
import OptionsResponse from '../../src/responses/options-response';
import CompositeResponse from '../../src/responses/composite-response';
import TextResponse from '../../src/responses/text-response';
import checkNotNullTest from '../helpers/check-not-null';

checkNotNullTest('response', (args) => { new OptionsMap(args); });

test('can be constructed with default parameters', t => {
  new OptionsMap({ response: {} });
  t.pass();
});

test('should parse simple options response', t => {
  const response = new OptionsResponse({ rows:
  [
    [
      { label: 'one', value: '1' },
      { label: 'two', value: '2' },
      { label: 'three', value: '3' },
    ],
  ] });
  const om = new OptionsMap({ response });
  const map = om.parse();
  t.is(Object.keys(map).length, 3);
  t.is(map.one, '1');
  t.is(map.two, '2');
  t.is(map.three, '3');
});

test('should parse options response with multiple rows and columns', t => {
  const response = new OptionsResponse({ rows:
  [
    [
      { label: 'one', value: '1' },
    ],
    [
      { label: 'two', value: '2' },
      { label: 'three', value: '3' },
    ],
  ] });
  const om = new OptionsMap({ response });
  const map = om.parse();
  t.is(Object.keys(map).length, 3);
  t.is(map.one, '1');
  t.is(map.two, '2');
  t.is(map.three, '3');
});

test('should parse nested composite response with mixed responses', t => {
  const response1 = new OptionsResponse({ rows:
  [
    [
      { label: 'one', value: '1' },
      { label: 'two', value: '2' },
    ],
  ] });
  const response2 = new TextResponse({ message: 'foo' });
  const response3 = new OptionsResponse({ rows:
  [
    [
      { label: 'three', value: '3' },
      { label: 'four', value: '4' },
    ],
  ] });

  const cr1 = new CompositeResponse()
    .add(response1)
    .add(response2);
  const cr2 = new CompositeResponse()
    .add(response3);
  const response = new CompositeResponse()
    .add(cr1)
    .add(cr2);

  const om = new OptionsMap({ response });
  const map = om.parse();
  t.is(Object.keys(map).length, 4);
  t.is(map.one, '1');
  t.is(map.two, '2');
  t.is(map.three, '3');
  t.is(map.four, '4');
});
