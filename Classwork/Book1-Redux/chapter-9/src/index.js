import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Import Firebase core and the Realtime Database service
import firebase from 'firebase/app';
import 'firebase/database';

// Firebase project configuration object
// (This connects your React app to your Firebase backend)
const firebaseConfig = {
  apiKey: "AIzaSyBTgQ6GJqXCTSWsUBS4S4WER58WMqAp8Qo",
  authDomain: "reactcrud-5d30d.firebaseapp.com",
  projectId: "reactcrud-5d30d",
  storageBucket: "reactcrud-5d30d.firebasestorage.app",
  messagingSenderId: "692757016478",
  appId: "1:692757016478:web:ead0cc5d003d6a2b73708f",
  measurementId: "G-JPW5LGSEQ3"
};

/*
  Initialize Firebase.
  firebase.apps is an array of initialized Firebase app instances.
  - If the array is empty, Firebase has not been initialized yet.
  - This check prevents re-initializing Firebase if the app reloads
    or if React StrictMode mounts components twice in development.
*/
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Create the React root using the new React 18 API
const root = createRoot(document.getElementById('root'));

// Render the main <App /> component into the root DOM node
root.render(
  <React.StrictMode>
    {/* StrictMode helps identify potential problems in the app */}
    <App />
  </React.StrictMode>
);
