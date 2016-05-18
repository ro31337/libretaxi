import test from 'ava';
import FirebaseServer from 'firebase-server';
import StateStorage from '../src/state-storage';

let server = null;

test.before(() => {
  server = new FirebaseServer(5000, 'localhost.firebaseio.test', {
    test_state_key: { foo: 1, bar: 2 },
    another_key: { foo: 11, bar: 22 },
  });
});

test.after(() => {
  server.close();
});

test.cb('should load initial state from storage', t => {
  t.plan(4);

  const checkAnother = () => {
    new StateStorage('another_key').load().then((storage) => {
      const state = storage.state;
      t.is(state.foo, 11);
      t.is(state.bar, 22);
      t.end();
    });
  };

  new StateStorage('test_state_key').load().then((storage) => {
    const state = storage.state;
    t.is(state.foo, 1);
    t.is(state.bar, 2);
    checkAnother();
  });
});

test.cb('should have state if key not exists', t => {
  t.plan(1);
  new StateStorage('non_existing_key').load().then((storage) => {
    t.truthy(storage.state);
    t.end();
  });
});

test.cb('should save state and execute callback', t => {
  t.plan(1);

  // to be executed on save ("line A" below)
  const callback = () => {
    new StateStorage('test_state_key').load().then((storage) => {
      t.is(storage.state.x, 3);
      t.end();
    });
  };

  new StateStorage('test_state_key').load().then((storage) => {
    const state = storage.state;
    state.x = 3;
    storage.save(callback); // line A
  });
});

test.cb('should save state without callback', t => {
  t.plan(1);

  // to be executed after save ("line B" below)
  const verify = () => {
    new StateStorage('test_state_key').load().then((storage) => {
      t.is(storage.state.y, 4);
      t.end();
    });
  };

  new StateStorage('test_state_key').load().then((storage) => {
    const state = storage.state;
    state.y = 4;
    storage.save();

    setTimeout(verify, 300); // line B
  });
});

test.cb('should update state values', t => {
  t.plan(3);

  new StateStorage('test_state_key').load().then((storage) => {
    storage.setState({
      prop1: 1,
      prop2: 2,
    });
    t.is(storage.state.prop1, 1);
    t.is(storage.state.prop2, 2);
    t.is(storage.state.foo, 1); // should not affect existing data
    t.end();
  });
});

test.cb('should sync values between two storages with the same key', t => {
  t.plan(1);

  new StateStorage('must_sync').load().then((storage) => {
    const interval = setInterval(() => {
      if (storage.state.foo) {
        clearInterval(interval);
        t.is(storage.state.foo, 123);
        t.end();
      }
    }, 100);
  });

  new StateStorage('must_sync').load().then((storage) => {
    const state = storage.state;
    state.foo = 123;
    storage.save();
  });
});

test.cb('should not sync values when disposed', t => {
  // update procedure, to be executed on "line C" below.
  const update = () => {
    new StateStorage('should_not_sync').load().then((storage) => {
      const state = storage.state;
      state.foo = 123;
      storage.save();
    });
  };

  new StateStorage('should_not_sync').load().then((storage) => {
    storage.dispose(); // dispose current
    update(); // line C. run procedure that updates storage with the same key

    // check every 100 ms, fail if updated
    const interval = setInterval(() => {
      if (storage.state.foo) {
        t.fail();
      }
    }, 100);

    // after one second consider it's passed, clear interval
    setTimeout(() => {
      clearInterval(interval);
      t.pass();
      t.end();
    }, 1000);
  });
});
