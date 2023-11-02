import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZSz1i-eMTLta0RBnk6RZooH32Bj2egNc",
    authDomain: "react-crud-app-fe174.firebaseapp.com",
    projectId: "react-crud-app-fe174",
    storageBucket: "react-crud-app-fe174.appspot.com",
    messagingSenderId: "229601924692",
    appId: "1:229601924692:web:60e1bc9c4e482c825a3fc1",
    measurementId: "G-SP3DT4D070"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);