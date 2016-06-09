/* eslint-disable no-new */
import test from 'ava';
import OptionsResponse from '../../src/responses/options-response';

test('can be constructed with default parameters', t => {
  new OptionsResponse({ rows: [[{ label: 'Ok', value: 'ok' }]] });
  t.pass();
});

test.cb('should throw argument error when rows not specified', t => {
  const err = 'rows parameter not specified';

  t.throws(() => {
    new OptionsResponse();
  }, err);

  t.end();
});

test.cb('should throw type error when rows is not array', t => {
  const err = 'rows parameter is expected to be an array';

  t.throws(() => {
    new OptionsResponse({
      rows: 'something',
    });
  }, err);

  t.end();
});

test.cb('should throw type error when row is not array', t => {
  const err = 'row is expected to be an array';

  t.throws(() => {
    new OptionsResponse({
      rows: [
        [{ label: 'Ok', value: 'ok' }], // array, OK
        {}, // not array, ERR
      ],
    });
  }, err);

  t.end();
});

test.cb('should throw type error when row item is not object', t => {
  const err = 'row item is expected to be an object';

  t.throws(() => {
    new OptionsResponse({
      rows: [
        [
          { label: 'Ok', value: 'ok' }, // object, OK
          'something else', // not object, ERR
        ],
      ],
    });
  }, err);

  t.end();
});

test.cb('should throw argument error when row item has no value property', t => {
  const err = 'row item is expected to have \'value\' property';

  t.throws(() => {
    new OptionsResponse({
      rows: [
        [
          { label: 'Ok' }, // no `value` property
        ],
      ],
    });
  }, err);

  t.end();
});

test.cb('should throw argument error when row item has no label property', t => {
  const err = 'row item is expected to have \'label\' property';

  t.throws(() => {
    new OptionsResponse({
      rows: [
        [
          { value: 'ok' }, // no `label` property
        ],
      ],
    });
  }, err);

  t.end();
});

test('instance should have rows as a property', t => {
  const r = new OptionsResponse({ rows: [[{ label: 'Ok', value: 'ok' }]] });
  t.truthy(r.rows);
  t.pass();
});
