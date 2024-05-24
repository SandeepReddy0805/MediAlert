import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDuBfOlqRlBm3yT0FeBY8e1c_njCmM7phI",
  authDomain: "medi-alert-1ba95.firebaseapp.com",
  projectId: "medi-alert-1ba95",
  storageBucket: "medi-alert-1ba95.appspot.com",
  messagingSenderId: "984389163635",
  appId: "1:984389163635:web:69aa5a08a7229f9c36a806"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const messaging = firebase.messaging();
export { auth, db, messaging} 
