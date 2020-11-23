import firebase from 'firebase/app';
import 'firebase/messaging';


const firebaseConfig = {
    apiKey: "AIzaSyCxelbY_JPzcWFlyRL8vajkfjrIn0efUXg",
    authDomain: "brokers24-f50f6.firebaseapp.com",
    databaseURL: "https://brokers24-f50f6.firebaseio.com",
    projectId: "brokers24-f50f6",
    storageBucket: "brokers24-f50f6.appspot.com",
    messagingSenderId: "767750653969",
    appId: "1:767750653969:web:d1fe6ba3595b750be509b0"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// используем localStorage для отметки того,
// что пользователь уже подписался на уведомления
function isTokenSentToServer(currentToken: string) {
    return localStorage.getItem('sentFirebaseMessagingToken') === currentToken;
}

function sendTokenToServer(currentToken: string) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('Отправка токена на сервер...');

        // var url = ''; // адрес скрипта на сервере который сохраняет ID устройства
        // $.post(url, {
        //     token: currentToken
        // });

        console.log(`SEND TO SERVER: ${currentToken}`);

        setTokenSentToServer(currentToken);
    } else {
        console.log('Токен уже отправлен на сервер.');
    }
}


function setTokenSentToServer(currentToken: string) {
    localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}


document.getElementById('subscribe').addEventListener('click', () => {
    messaging.getToken().then((currentToken) => {
        if (currentToken) {
            sendTokenToServer(currentToken);
        } else {
            // Show permission request.
            console.log('No registration token available. Request permission to generate one.');
            // Show permission UI.
            setTokenSentToServer(null);
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        setTokenSentToServer(null);
    });

});


messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    if (!document.hidden) {
        new Notification(payload.notification.title, {
            body: payload.notification.body,
        });
    }
});
