import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';                   // Import global CSS styles
import App from './App';                // Main App component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Create a root element for React to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
// React.StrictMode helps detect potential problems in development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
