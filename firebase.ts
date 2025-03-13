// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSVH4t15Y0vLQQPD2kknMRmQJsKyRruHA",
  authDomain: "worknest-acf2a.firebaseapp.com",
  projectId: "worknest-acf2a",
  storageBucket: "worknest-acf2a.firebasestorage.app",
  messagingSenderId: "740631319052",
  appId: "1:740631319052:web:3b54274de92c21db861429"
};

// Initialize Firebase
const app = getApps().length==0? initializeApp(firebaseConfig):getApp();
const db = getFirestore(app);

export {db};
