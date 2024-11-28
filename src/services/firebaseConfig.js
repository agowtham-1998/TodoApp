import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCAxfxdd3KBfPUEm4ITEo8ldGX0MTfDkQM",
  authDomain: "todo-f819a.firebaseapp.com",
  projectId: "todo-f819a",
  storageBucket: "todo-f819a.firebasestorage.app",
  messagingSenderId: "685232743558",
  appId: "1:685232743558:android:1b8b076251d1d50855dd07",
};

// Initialize Firebase only if it's not initialized yet
let app;
if (getApps().length === 0) {
  // Initialize Firebase app
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const firestore = getFirestore(app);

export { auth, firestore, };
