// Import React library to enable JSX
import React from 'react';

// Import Bootstrap CSS for styling and responsive layout
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the UserForm component to display a form
import UserForm from './UserForm';

// Define a functional component called App
function App() {
  // Return the JSX that will be rendered in the browser
  return (
    // Bootstrap container with top margin
    <div className="container mt-5">
      {/* Render the UserForm component */}
      <UserForm />
    </div>
  );
}

// Export the App component so it can be used in index.js
export default App;
