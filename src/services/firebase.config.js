// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACnX2r9NJddSvXKUWg6n9xCs2JCCt2BF8",
  authDomain: "fir-2144a.firebaseapp.com",
  projectId: "fir-2144a",
  storageBucket: "fir-2144a.appspot.com",
  messagingSenderId: "157052564375",
  appId: "1:157052564375:web:8ba6d1741e14a8327d8ad2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
