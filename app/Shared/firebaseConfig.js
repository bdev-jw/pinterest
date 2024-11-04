// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3TfzApKfIhjSRORbmG2_zmGAYiLgGZDk",
  authDomain: "pinterest-web.firebaseapp.com",
  projectId: "pinterest-web",
  storageBucket: "pinterest-web.appspot.com",
  messagingSenderId: "888260501589",
  appId: "1:888260501589:web:aefad229746bd43df8b4dc",
  measurementId: "G-2NKDXGYXLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;