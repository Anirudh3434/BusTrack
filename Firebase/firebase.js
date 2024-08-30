// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR_hCOX3M47NNKMnKKeQohI8xnDdWSJQU",
  authDomain: "bustrack-5aed2.firebaseapp.com",
  projectId: "bustrack-5aed2",
  storageBucket: "bustrack-5aed2.appspot.com",
  messagingSenderId: "644984467328",
  appId: "1:644984467328:web:4d9238cccd9c353ac41b65",
  measurementId: "G-C1ELDC6FGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, doc, setDoc, getDoc };
