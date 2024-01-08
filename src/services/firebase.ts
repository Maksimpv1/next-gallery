'use client'

import { getFirestore } from "@firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDoh4TnqwKP3DCUtwyTTmQKnuFv7VwNsno",
    authDomain: "auth-test-slmax.firebaseapp.com",
    projectId: "auth-test-slmax",
    storageBucket: "auth-test-slmax.appspot.com",
    messagingSenderId: "382422569285",
    appId: "1:382422569285:web:d0a9679e08dbf7c3ceee2c",
    measurementId: "G-R5D61ZTJ48"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbFirebase = getFirestore(app); 

export { auth, dbFirebase };