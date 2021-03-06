import firebase from 'firebase';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
};

firebase.initializeApp(config);

const firebaseAuth = firebase.auth;
export default firebaseAuth;

