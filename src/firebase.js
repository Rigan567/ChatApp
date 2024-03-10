// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ_Ml-c4KXNC34EteQJqV3-L2Xrj9Omt0",
  authDomain: "chatapp-d1001.firebaseapp.com",
  projectId: "chatapp-d1001",
  storageBucket: "chatapp-d1001.appspot.com",
  messagingSenderId: "22347730",
  appId: "1:22347730:web:5de93cbff38cd2f9f4520b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
