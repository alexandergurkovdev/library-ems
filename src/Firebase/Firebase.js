import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "wiki-ems.firebaseapp.com",
  databaseURL: "https://wiki-ems.firebaseio.com",
  projectId: "wiki-ems",
  storageBucket: "wiki-ems.appspot.com",
  messagingSenderId: "714794421919",
  appId: "1:714794421919:web:febeb66074bc1f53e45caa"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
