// Import React library to enable JSX
import React from 'react';

// Import Bootstrap CSS for styling and layout
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the JumbotronComponent to display a header/banner section
import JumbotronComponent from './JumbotronComponent';

// Import the Products component to display the product list
import Products from './Products';

// Define a functional component called App
function App() {

  // Return the JSX that will be rendered in the browser
  return (
    <div>
      {/* Jumbotron component displaying a welcome message */}
      {/* The text inside is passed as children */}
      <JumbotronComponent>
        Welcome to our product catalog! Browse our amazing selection of products below.
      </JumbotronComponent>

      {/* Render the Products component */}
      <Products />
    </div>
  );
}

// Export the App component so it can be used by index.js
export default App;
