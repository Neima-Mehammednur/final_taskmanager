

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

// Initialize Firebase Auth with AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);