
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');


const firebaseConfig = {
  apiKey: "AIzaSyB7ei2_nbYDKnazOKH-DytKNfL26frX6IM",
  authDomain: "runyourlife-c4671.firebaseapp.com",
  projectId: "runyourlife-c4671",
  storageBucket: "runyourlife-c4671.appspot.com",
  messagingSenderId: "367283710387",
  appId: "1:367283710387:web:feee08123cb6333c2d03c6",
  measurementId: "G-XG9R7J8Z7H"
};


firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

// messaging.onBackgroundMessage(payload1 => {
//   console.log(payload1, 'firebase')
// })

messaging.setBackgroundMessageHandler(function(payload) {
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});


