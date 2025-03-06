
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYUy91570_hg-TolFk11AgqIOhHJwbjJo",
  authDomain: "uni-taskmanager.firebaseapp.com",
  projectId: "uni-taskmanager",
  storageBucket: "uni-taskmanager.firebasestorage.app",
  messagingSenderId: "322188205496",
  appId: "1:322188205496:web:b41887d39e8885b490c34d",
  measurementId: "G-KNB242ZTBS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();