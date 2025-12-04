// Import React and the Component class from the React library
import React, { Component } from 'react';

// Import the JumboTronComponent so we can use it inside this file
import JumboTronComponent from './JumboTronComponent';

// Create a new class component called App
class App extends Component {
  // Render method determines what gets displayed on the screen
  render() {
    return (
      // Parent container that wraps everything returned by this component
      <div>
        {/* Use the JumboTronComponent and pass text as its children */}
        <JumboTronComponent>
          {/* This text is inserted into the JumboTronComponent from outside */}
          This is a long sentence, and I want to insert content into the
          jumbotron component from the outside.
        </JumboTronComponent>
      </div>
    );
  }
}

// Export the App component so it can be used in other files
export default App;
