// Import the core React library
import React from 'react';

// Import ReactDOM for rendering React components into the DOM
import ReactDOM from 'react-dom/client';

// Import global CSS styles for the application
import './index.css';

// Import the main App component
import App from './App';

// Import performance measuring utility (optional)
import reportWebVitals from './reportWebVitals';

// Create a root DOM node where the React application will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside React.StrictMode
// StrictMode helps highlight potential problems during development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: measure and report app performance
// You can log results with: reportWebVitals(console.log)
// Or send metrics to an analytics service
reportWebVitals();
