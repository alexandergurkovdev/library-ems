import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import authReducer from './authReducer';
import booksReducer from './booksReducer';

export default combineReducers({
  auth: authReducer,
  books: booksReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
