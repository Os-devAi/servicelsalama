// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcNfUsfpAxX-KeUNXn7Vo8CRR3Olwxh4s",
  authDomain: "inventory-managment-b9e28.firebaseapp.com",
  projectId: "inventory-managment-b9e28",
  storageBucket: "inventory-managment-b9e28.appspot.com",
  messagingSenderId: "472539951496",
  appId: "1:472539951496:web:5a88185e3871b02ea00a3d",
  measurementId: "G-CJS07D070M"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };