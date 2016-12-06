import test from 'ava';
import { loadOrder, mockLoadOrder } from '../../src/factories/order-factory';

test.cb('mockLoadOrder should mock loadOrder with mock', t => {
  t.plan(1);
  const mock = () => { t.pass(); t.end(); };
  mockLoadOrder(mock);
  loadOrder();
});
