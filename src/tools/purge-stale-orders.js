/* eslint-disable no-console */
import firebase from 'firebase';
import firebaseDB from '../firebase-db';

const ordersDB = firebaseDB.config().ref('orders');
const now = (new Date).getTime();
const objectsToPurge = [];
let objectsToIgnoreCount = 0;

ordersDB.once('value', (snapshot) => {
  const orders = snapshot.val();

  // identify orders to purge

  Object.keys(orders).forEach((key) => {
    const createdAt = orders[key].createdAt || 0;
    const timeDiff = (now - createdAt) / (1000 * 60 * 60); // hours

    if (timeDiff > 6) {
      objectsToPurge.push({ key, orderData: orders[key] });
    } else {
      objectsToIgnoreCount++;
    }
  });

  console.log(`${objectsToPurge.length} orders to purge, ${objectsToIgnoreCount} to ignore`);

  // create removeAll callback,
  // executed by objectCopiedCallback when all objects have been copied

  const removeAll = () => {
    let removeCount = 0;
    console.log('Everything was copied, time to remove all!');

    const objectRemovedCallback = () => {
      removeCount++;
      console.log(`Orders removed: ${removeCount}`);
      if (removeCount === objectsToPurge.length) {
        console.log('All done!');
        firebase.database().goOffline();
      }
    };

    objectsToPurge.forEach((obj) => {
      ordersDB.child(obj.key).remove(objectRemovedCallback);
    });
  };

  // create "copied" callback

  let copiedCount = 0;
  const objectCopiedCallback = () => {
    copiedCount++;
    console.log(`Orders copied: ${copiedCount}`);
    if (copiedCount === objectsToPurge.length) {
      removeAll();
    }
  };

  // copy orders to `staleOrders`

  if (objectsToPurge.length > 0) {
    objectsToPurge.forEach((obj) => {
      const { key, orderData } = obj;
      const objectDB = firebaseDB.config().ref(`staleOrders/${key}`);
      objectDB.update(orderData, objectCopiedCallback);
    });
  } else {
    firebase.database().goOffline();
  }
}, (err) => {
  console.log(`ERROR: ${err}`);
});
