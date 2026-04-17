// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <--- Make sure this is imported
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFvR3VR4X0TkugzFeqjF9tSpbuj11VovY",
  authDomain: "readyflowapp.firebaseapp.com",
  projectId: "readyflowapp",
  storageBucket: "readyflowapp.firebasestorage.app",
  messagingSenderId: "1030402139238",
  appId: "1:1030402139238:web:0ca8a877f863806b21f9a7",
  measurementId: "G-S87GD671YV"
};

// Initialize Firebase (prevents re-initialization errors)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

// THIS IS WHAT YOU ARE MISSING:
export const provider = new GoogleAuthProvider();