importScripts('/__/firebase/9.2.0/firebase-app-compat.js');
importScripts('/__/firebase/9.2.0/firebase-messaging-compat.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging();
firebase.initializeApp({
  apiKey: "AIzaSyDuBfOlqRlBm3yT0FeBY8e1c_njCmM7phI",
  authDomain: "medi-alert-1ba95.firebaseapp.com",
  projectId: "medi-alert-1ba95",
  storageBucket: "medi-alert-1ba95.appspot.com",
  messagingSenderId: "984389163635",
  appId: "1:984389163635:web:69aa5a08a7229f9c36a806"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

messaging.onBackgroundMessage((payload) => {
    const data = payload.notification;
    const notificationTitle = "Time for your Medicine.";
    const notificationOptions = {
        body: `${data.title}: ${data.body}`,
        icon: "https://img.freepik.com/premium-vector/red-white-capsule-pill_92242-102.jpg",
        image: "https://img.freepik.com/premium-vector/red-white-capsule-pill_92242-102.jpg"
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});