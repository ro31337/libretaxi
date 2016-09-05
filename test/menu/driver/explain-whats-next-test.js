/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import ExplainWhatsNext from '../../../src/actions/menu/driver/explain-whats-next';
import { i18n } from '../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  const action = new ExplainWhatsNext({ i18n, user });
  t.is(action.type, 'driver-explain-whats-next');
  t.pass();
});

test('should return composite response on get', t => {
  const action = new ExplainWhatsNext({ i18n, user });
  const response = action.get();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, i18n.__('driver-explain-whats-next.text'));
  t.is(response.responses[1].type, 'options');
  t.is(response.responses[1].rows[0][0].value, 'next');
  t.is(response.responses[1].rows[0][0].label, i18n.__('driver-explain-whats-next.next'));
});

test('should return composite response on post', t => {
  const action = new ExplainWhatsNext({ i18n, user });

  const response = action.post();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'text');
  t.is(response.responses[0].message, '👌 OK!');
  t.is(response.responses[1].type, 'redirect');
  t.is(response.responses[1].path, 'foo');
});
