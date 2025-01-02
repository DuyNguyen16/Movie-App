// Import the functions you need from the Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { firebaseAPIKey } from '../api/firebase_api'; // Import your API key from a separate file

// Firebase configuration
const firebaseConfig = {
  apiKey: firebaseAPIKey,
  authDomain: 'movie-app-24797.firebaseapp.com',
  projectId: 'movie-app-24797',
  storageBucket: 'movie-app-24797.firebasestorage.app',
  messagingSenderId: '849351418561',
  appId: '1:849351418561:web:3d942a84260b481c7cea40',
  measurementId: 'G-NZY5PLX3FJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };  
export default app; 
