import test from 'ava';
import UserFactory, { loadUser, mockLoadUser } from '../../src/factories/user-factory';

test('should create user by userKey', t => {
  const u = UserFactory.fromUserKey('cli_1');
  t.truthy(u);
  t.is(u.userKey, 'cli_1');
});

test.cb('should throw error when userKey not specified', t => {
  const err = 'userKey not specified';
  t.throws(() => { UserFactory.fromUserKey(); }, err);
  t.end();
});

test.cb('mockLoadUser should mock loadUser with mock', t => {
  t.plan(1);
  const mock = () => { t.pass(); t.end(); };
  mockLoadUser(mock);
  loadUser();
});
