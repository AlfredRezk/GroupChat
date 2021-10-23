import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUCdAv7QgcOwimwyTzt4-b3PmwMF0E2UA",
  authDomain: "rnapp-chat.firebaseapp.com",
  projectId: "rnapp-chat",
  storageBucket: "rnapp-chat.appspot.com",
  messagingSenderId: "731032344816",
  appId: "1:731032344816:web:99834a4927ba93fd554a35",
  measurementId: "G-YNQ4YW1BKW"
};

let app;
firebase.apps.length === 0 ? app = firebase.initializeApp(firebaseConfig) : app = firebase.app();

let db = app.firestore();
export { db }