import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
//  Your configurations 
};

let app;
firebase.apps.length === 0 ? app = firebase.initializeApp(firebaseConfig) : app = firebase.app();

let db = app.firestore();
export { db }
