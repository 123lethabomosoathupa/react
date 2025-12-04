import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';

import 'firebase/compat/database';
import 'bootstrap/dist/css/bootstrap.min.css';

// Your Firebase configuration (USE YOUR OWN CONFIG!)
const firebaseConfig = {
  apiKey: "AIzaSyBTgQ6GJqXCTSWsUBS4S4WER58WMqAp8Qo",
  authDomain: "reactcrud-5d30d.firebaseapp.com",
  projectId: "reactcrud-5d30d",
  storageBucket: "reactcrud-5d30d.firebasestorage.app",
  messagingSenderId: "692757016478",
  appId: "1:692757016478:web:ead0cc5d003d6a2b73708f",
  measurementId: "G-JPW5LGSEQ3"
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);