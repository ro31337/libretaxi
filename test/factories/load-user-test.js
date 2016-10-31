import test from 'ava';
import UserFactory, { loadUser } from '../../src/factories/user-factory';
import { ss } from '../spec-support';

test('should call user factory on loadUser', t => {
  // arrange
  // stub UserFactory and return pre-defined user object
  const myUserFactory = {};
  const fromUserKey = ss.sinon.stub().returns(myUserFactory);
  const load = ss.sinon.stub().returns(31337);
  Object.assign(myUserFactory, { fromUserKey, load });
  UserFactory.fromUserKey = fromUserKey;

  // act
  const u = loadUser('cli_1');

  // assert
  t.is(u, 31337);
  t.truthy(fromUserKey.calledWith('cli_1'));
  t.truthy(load.calledWith());
});

// do not move `mockLoadUser` test here, because tests run in parallel.
