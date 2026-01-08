// Import React library to enable JSX
import React from 'react';

// Import Bootstrap CSS for styling and responsive layout
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the Products component
import Products from './Products';

// Define a functional component called App
function App() {

  // Return the JSX that will be rendered in the browser
  return (
    <div>
      {/* Render the Products component */}
      <Products />
    </div>
  );
}

// Export the App component so it can be used in other files
export default App;
