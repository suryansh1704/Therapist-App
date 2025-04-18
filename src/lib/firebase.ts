
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "PASTE_YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "PASTE_YOUR_FIREBASE_AUTH_DOMAIN_HERE",
  projectId: "PASTE_YOUR_FIREBASE_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_FIREBASE_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_FIREBASE_MESSAGING_SENDER_ID_HERE",
  appId: "PASTE_YOUR_FIREBASE_APP_ID_HERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
