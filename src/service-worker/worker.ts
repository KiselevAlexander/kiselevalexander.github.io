import firebase from 'firebase/app';
import 'firebase/messaging';


// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
//@ts-ignore
firebase.initializeApp({
    apiKey: "AIzaSyCxelbY_JPzcWFlyRL8vajkfjrIn0efUXg",
    authDomain: "brokers24-f50f6.firebaseapp.com",
    databaseURL: "https://brokers24-f50f6.firebaseio.com",
    projectId: "brokers24-f50f6",
    storageBucket: "brokers24-f50f6.appspot.com",
    messagingSenderId: "767750653969",
    appId: "1:767750653969:web:d1fe6ba3595b750be509b0"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
//@ts-ignore
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
    };
    //@ts-ignore
    self.registration.showNotification(notificationTitle,
        notificationOptions);
});