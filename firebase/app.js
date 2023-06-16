import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import 'firebase/firestore';
const firebaseConfig = {
    apiKey:'AIzaSyAFvDWvbav1xvn3Vc5wBO2p6FBjtNDyNFE',
    authDomain: 'picapp.firebaseapp.com',
    projectId:'picapp-382618',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);

  
  export const auth = getAuth();
//export const auth = firebase.auth();
//export const firestore = firebase.firestore(); // Add this line if you need Firestore
export default firebaseConfig;
