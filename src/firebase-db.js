require('dotenv').config();
import firebase from 'firebase';

const config = {
  serviceAccount: process.env.STATEFUL_CREDENTIALS_FILE, // must be undefined for tests
  databaseURL: process.env.STATEFUL_CONNSTR,
};

const firebaseDB = firebase.initializeApp(config).database();

export default firebaseDB;
