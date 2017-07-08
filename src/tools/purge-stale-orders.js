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
