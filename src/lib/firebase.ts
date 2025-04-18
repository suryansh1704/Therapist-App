
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABx1udym6Jv6x_jCVLw4zY6nCSBFREWbI",
  authDomain: "therapy-webapp-be11e.firebaseapp.com",
  projectId: "therapy-webapp-be11e",
  storageBucket: "therapy-webapp-be11e.firebasestorage.app",
  messagingSenderId: "712697750681",
  appId: "1:712697750681:web:77be4449a2e14d30988408"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
