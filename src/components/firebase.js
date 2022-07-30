// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKCX-jazLekfM1TOtre_kxuxOXGXa8jB0",
  authDomain: "test-81808.firebaseapp.com",
  projectId: "test-81808",
  storageBucket: "test-81808.appspot.com",
  messagingSenderId: "767253421543",
  appId: "1:767253421543:web:d356acd903685930163142",
  measurementId: "G-V8WLDZRRZT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
