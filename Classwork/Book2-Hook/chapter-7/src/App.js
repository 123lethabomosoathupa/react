// Import React to be able to create and use React components
import React from 'react';

// Import Bootstrap CSS for styling the application
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the GitHub component from the local file
import GitHub from './GitHub';

// Define the main App functional component
function App() {
  return (
    // Bootstrap container with top margin for layout spacing
    <div className="container mt-5">
      {/* Render the GitHub component inside the container */}
      <GitHub />
    </div>
  );
}

// Export the App component so it can be used in other parts of the application
export default App;
