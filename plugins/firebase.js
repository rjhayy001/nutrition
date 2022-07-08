import { initializeApp, getApps } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB7ei2_nbYDKnazOKH-DytKNfL26frX6IM",
  authDomain: "runyourlife-c4671.firebaseapp.com",
  projectId: "runyourlife-c4671",
  storageBucket: "runyourlife-c4671.appspot.com",
  messagingSenderId: "367283710387",
  appId: "1:367283710387:web:feee08123cb6333c2d03c6",
  measurementId: "G-XG9R7J8Z7H"
};

const apps = getApps()

const app = !apps.length ? initializeApp(firebaseConfig) : apps[0];

export const messaging =getMessaging(app)
