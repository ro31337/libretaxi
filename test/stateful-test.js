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

import test from 'ava';
import FirebaseServer from 'firebase-server';
import Demo from './stateful-demo';
import { overrideSettings } from '../src/firebase-db';

overrideSettings({
  STATEFUL_CONNSTR: 'ws://localhost.firebaseio.test:5000',
});

let server = null;

test.before(() => {
  server = new FirebaseServer(5000, 'localhost.firebaseio.test', {
    demo: {
      test_state_key: { foo: 1, bar: 2 },
      another_key: { foo: 11, bar: 22 },
    },
  });
});

test.after.always('guaranteed cleanup', () => {
  server.close();
});

test.cb('should load initial state from storage', t => {
  t.plan(4);

  const checkAnother = () => {
    new Demo('another_key').load().then((demo) => {
      const state = demo.state;
      t.is(state.foo, 11);
      t.is(state.bar, 22);
      t.end();
    })
    .catch((err) => {
      t.fail(`ERR2: ${err}`);
    });
  };

  new Demo('test_state_key').load().then((demo) => {
    const state = demo.state;
    t.is(state.foo, 1);
    t.is(state.bar, 2);
    checkAnother();
  })
  .catch((err) => {
    t.fail(`ERR1: ${err}`);
  });
});

test.cb('should have state if key not exists', t => {
  t.plan(1);
  new Demo('non_existing_key').load().then((demo) => {
    t.truthy(demo.state);
    t.end();
  })
  .catch((err) => {
    t.fail(`ERR3: ${err}`);
  });
});

test.cb('should save state and execute callback', t => {
  t.plan(1);

  // to be executed on save ("line A" below)
  const callback = () => {
    new Demo('test_state_key').load().then((demo) => {
      t.is(demo.state.x, 3);
      t.end();
    })
    .catch((err) => {
      t.fail(`ERR4: ${err}`);
    });
  };

  new Demo('test_state_key').load().then((demo) => {
    const state = demo.state;
    state.x = 3;
    demo.save(callback); // line A
  })
  .catch((err) => {
    t.fail(`ERR5: ${err}`);
  });
});

test.cb('should save state without callback', t => {
  t.plan(1);

  // to be executed after save ("line B" below)
  const verify = () => {
    new Demo('test_state_key').load().then((demo) => {
      t.is(demo.state.y, 4);
      t.end();
    })
    .catch((err) => {
      t.fail(`ERR6: ${err}`);
    });
  };

  new Demo('test_state_key').load().then((demo) => {
    const state = demo.state;
    state.y = 4;
    demo.save();

    setTimeout(verify, 300); // line B
  })
  .catch((err) => {
    t.fail(`ERR7: ${err}`);
  });
});

test.cb('should update state values', t => {
  t.plan(3);

  new Demo('test_state_key').load().then((demo) => {
    demo.setState({
      prop1: 1,
      prop2: 2,
    });
    t.is(demo.state.prop1, 1);
    t.is(demo.state.prop2, 2);
    t.is(demo.state.foo, 1); // should not affect existing data
    t.end();
  })
  .catch((err) => {
    t.fail(`ERR8: ${err}`);
  });
});

test.cb('should sync values between two storages with the same key', t => {
  t.plan(1);

  new Demo('must_sync').load().then((demo) => {
    const interval = setInterval(() => {
      if (demo.state.foo) {
        clearInterval(interval);
        t.is(demo.state.foo, 123);
        t.end();
      }
    }, 100);
  })
  .catch((err) => {
    t.fail(`ERR9: ${err}`);
  });

  new Demo('must_sync').load().then((demo) => {
    const state = demo.state;
    state.foo = 123;
    demo.save();
  })
  .catch((err) => {
    t.fail(`ERR10: ${err}`);
  });
});

test.cb('should not sync values when disposed', t => {
  // update procedure, to be executed on "line C" below.
  const update = () => {
    new Demo('should_not_sync').load().then((demo) => {
      const state = demo.state;
      state.foo = 123;
      demo.save();
    })
    .catch((err) => {
      t.fail(`ERR11: ${err}`);
    });
  };

  new Demo('should_not_sync').load().then((demo) => {
    demo.dispose(); // dispose current
    update(); // line C. run procedure that updates storage with the same key

    // check every 100 ms, fail if updated
    const interval = setInterval(() => {
      if (demo.state.foo) {
        t.fail();
      }
    }, 100);

    // after one second consider it's passed, clear interval
    setTimeout(() => {
      clearInterval(interval);
      t.pass();
      t.end();
    }, 1000);
  })
  .catch((err) => {
    t.fail(`ERR12: ${err}`);
  });
});
