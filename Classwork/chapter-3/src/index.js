// Import the core React library (needed for JSX)
import React from 'react';

// Import ReactDOM for rendering React components into the DOM
import ReactDOM from 'react-dom/client';

// Import the global stylesheet for the whole application
import './index.css';

// Import the main App component
import App from './App';

// Import optional performance measurement tool
import reportWebVitals from './reportWebVitals';

// Create a root element where the React application will be rendered
// document.getElementById('root') targets the <div id="root"></div> in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the <App /> component inside React.StrictMode
// StrictMode helps detect potential problems during development (not used in production)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: measure app performance.
// You can log performance results using: reportWebVitals(console.log)
// Or send them to an analytics endpoint.
reportWebVitals();
