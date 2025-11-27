// Import React and the Component class from the React library
import React, { Component } from 'react';

// Create a class-based component named App
class App extends Component {

  // The render() method returns the UI that should appear on the screen
  render() {
    return (
      // React components must return a single parent element
      <div>
        {/* This is an H1 heading displayed inside the div */}
        <h1>
          My First React App!
        </h1>
      </div>
    );
  }
}

// Export the App component so it can be used in other files
export default App;
