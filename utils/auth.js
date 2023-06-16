// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFvDWvbav1xvn3Vc5wBO2p6FBjtNDyNFE",
  authDomain: "picapp-382618.firebaseapp.com",
  projectId: "picapp-382618",
  storageBucket: "picapp-382618.appspot.com",
  messagingSenderId: "1003750430284",
  appId: "1:1003750430284:web:7262d64a176a12c79146e9",
  measurementId: "G-8JN9KFX3HE"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);