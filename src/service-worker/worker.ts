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

self.addEventListener('notificationclick', (event) =>{
    const target = event.notification.data.click_action || '/';
    event.notification.close();

    // This looks to see if the current is already open and focuses if it is
    //@ts-ignore
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
        //@ts-ignore
    }).then((clientList) => {
        // clientList always is empty?!
        for (var i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (client.url === target && 'focus' in client) {
                return client.focus();
            }
        }
        //@ts-ignore
        return clients.openWindow(target);
    }));
});
