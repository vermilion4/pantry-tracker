// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpCjOquqzz4e1G9iN-mIM0XtzFQWpziMs",
  authDomain: "pantry-tracker-cd06b.firebaseapp.com",
  projectId: "pantry-tracker-cd06b",
  storageBucket: "pantry-tracker-cd06b.appspot.com",
  messagingSenderId: "904014847787",
  appId: "1:904014847787:web:3ad6bee602836f89bcef6e",
  measurementId: "G-8B3ZWSBH9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore };