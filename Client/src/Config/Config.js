import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyD4AJ4QsMD1joT5kSQkJ6AVAmjxNo9O5s4",
  authDomain: "medialert-15dab.firebaseapp.com",
  projectId: "medialert-15dab",
  storageBucket: "medialert-15dab.appspot.com",
  messagingSenderId: "1029735286625",
  appId: "1:1029735286625:web:e08bce8451a7431af8e720"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const messaging = firebase.messaging();
export { auth, db, messaging} 
