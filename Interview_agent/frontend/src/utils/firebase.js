// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interview-agent-f764b.firebaseapp.com",
  projectId: "interview-agent-f764b",
  storageBucket: "interview-agent-f764b.firebasestorage.app",
  messagingSenderId: "928894643269",
  appId: "1:928894643269:web:3fa610540356fb41d0c72c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}