// Import React and Component class so we can create a class-based component
import React, { Component } from 'react';
// Import the GitHub component so we can use it inside this App component
import GitHub from './GitHub';

// Define the App component
class App extends Component {
  // The render method determines what the UI looks like
  render() {
    return (
      // Wrapper div for everything returned by this component
      <div>
        {/* Render the GitHub component inside the App */}
        <GitHub />
      </div>
    );
  }
}

// Export the App component so it can be imported and used in other files
export default App;
