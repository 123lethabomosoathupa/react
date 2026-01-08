// Import React library (required when using JSX)
import React from 'react';

// Import ReactDOM to render React components into the browser DOM
import ReactDOM from 'react-dom';

// Import global CSS styles for the application
import './index.css';

// Import the main App component
import App from './App';

// Import service worker utilities (for offline and caching features)
import * as serviceWorker from './serviceWorker';

// Import Bootstrap CSS for responsive styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Render the App component inside the root HTML element
ReactDOM.render(
  // StrictMode helps detect potential problems in development
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  // Select the DOM element with id="root"
  document.getElementById('root')
);

// Disable the service worker (no offline support)
serviceWorker.unregister();
