// Import React library to enable JSX
import React from 'react';

// Import ReactDOM to render React components into the DOM
import ReactDOM from 'react-dom';

// Import global CSS for the app
import './index.css';

// Import the main App component
import App from './App';

// Import service worker functions (for offline caching, optional)
import * as serviceWorker from './serviceWorker';

// Import Bootstrap CSS for responsive styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Render the App component inside the root div in index.html
ReactDOM.render(
  // React.StrictMode helps detect potential problems during development
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  // Target the HTML element with id="root"
  document.getElementById('root')
);

// Unregister the service worker (app will not work offline)
serviceWorker.unregister();
